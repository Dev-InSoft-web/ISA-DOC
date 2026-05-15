# Flujos · Obtener / Editar

Esta sección describe los dos flujos transversales más comunes del módulo
**Capacitación** y qué tablas tocan.

## Flujo · AL OBTENER (GET Curso)

![Diagrama del flujo GET](/imgs/DER%20GET.png)

| Tabla | Acción | Por qué |
| --- | --- | --- |
| `CAPAC_CURSOS` | `SELECT` | Encabezado del curso. |
| `CAPAC_TEMAS` | `SELECT` | Resolver `ITEMA`. |
| `CAPAC_DRIVERS` | `SELECT` | Resolver `IDRIVER`. |
| `CAPAC_ESTRUCTURAS_CURSOS` | `SELECT` | Niveles. |
| `CAPAC_SEGURIDADES_CURSOS` | `SELECT` | Permisos. |
| `CAPAC_PLANES_CURSOS` | `SELECT` | Cursos vinculados al plan. |
| `CAPAC_ATRIBUTOS_PLANES` | `SELECT` | Atributos del plan-curso. |

> El GET de curso **no consulta** dominios externos como recursos o
> mensajería. Si el cliente necesita el recurso vinculado al plan, debe
> llamar específicamente a `GET /api/curso/recursoplan/{icurso}`.

## Flujo · AL EDITAR (PUT Curso)

![Diagrama del flujo UPDATE](/imgs/DER%20UPDATE.png)

1. Inicia transacción.
2. `UPDATE CAPAC_CURSOS` (encabezado).
3. **Diff & sync** las colecciones hijas si vienen en el body:
   - `CAPAC_ESTRUCTURAS_CURSOS` — borra los niveles eliminados, inserta los
     nuevos, actualiza los modificados.
   - `CAPAC_SEGURIDADES_CURSOS` — sincroniza permisos.
   - `CAPAC_ATRIBUTOS_PLANES` — sincroniza atributos.
4. **No toca**:
   - `CAPAC_TEMAS`, `CAPAC_DRIVERS` (catálogos maestros, se editan por su
     propio endpoint).
   - Tablas de dominios externos (recursos, mensajería).
5. Commit / rollback.

## Recodificar vs Actualizar

- `Actualizar` (`PUT /:pk`) — modifica datos sin cambiar el PK.
- `Recodificar` (`PUT /recodificar/:pk` con `nuevo_*`) — cambia el PK y
  cascada los FKs en todas las tablas que referencian al curso/plan/etc.

## Eliminar

`DELETE /api/curso/{icurso}`:

1. Verifica que no existan dependencias bloqueantes.
2. Borra primero hijos
   (`SEGURIDADES`, `ESTRUCTURAS`, `ATRIBUTOS`, `PLANES_CURSOS` con ese
   curso) y finalmente la fila en `CAPAC_CURSOS`.
3. Devuelve `204 No Content`.

## Verificar

`GET /api/curso/verificar/{icurso}` devuelve si la PK existe, útil para
validaciones del formulario antes de submit.

## Implementación · `Get_Recurso_PlanCurso`

El endpoint custom resuelve el curso con sus planes, y dentro de cada
plan **fusiona** atributos del recurso con atributos del plan,
removiendo los nodos vacíos para no enviar payload basura.

```typescript
	async Get_Recurso_PlanCurso(curso: TCurso): Promise<TCurso> {
		await this.VerifyAuthorization();
		const icurso = curso.icurso;
		const JData: iInfoCurso = { planescurso: { atributosplan: { todo }, recurso: { atributosrecurso: { todo }, participantes: { todo } } } };
		const Connection = await this.CtxUser.Connection();

		let ctrAuditoria: TAuditoriaController = new TAuditoriaController(this.CtxUser);
		let [idauditoria]: Array<any> = await ctrAuditoria.LookUp(['idauditoria'], {
			itercero: this.itercero,
			irol: this.irol,
			igrupo: this.igrupo,
			icontacto: this.icontacto
		}, true);

		const M = tablas.ntblRecursoMovimientoContacto;
		const P = tablas.ntblCapacPlanesCursos;
		const Query = await ExecuteQuery({
			Connection,
			sql: `SELECT TOP 1 C.*
				FROM ${this.sqlDetalle(JData)} AS C
				WHERE C.ICURSO = @icurso;
				SELECT P2.IRECURSO, COALESCE(SUM(M2.QSEGVISUALIZACION), 0) AS QSEGVISTO
				FROM ${P} P2
				LEFT JOIN ${M} M2 ON M2.IRECURSO = P2.IRECURSO AND M2.IDAUDCRE = @idauditoria
				WHERE P2.ICURSO = @icurso AND P2.IRECURSO IS NOT NULL
				GROUP BY P2.IRECURSO`,
			params: [
				{ name: "icurso", type: mssql.VarChar, value: icurso },
				{ name: "idauditoria", type: mssql.Int, value: idauditoria ?? 0 },
			],
		});

		Object.assign(curso, val2TObject(Query.recordset?.[0], TCurso));
		curso.planescurso = val2TArray(curso.planescurso, TPlanCurso, new TArray<TPlanCurso>());

		const progressMap = new Map<string, number>();
		for (const row of Query.recordsets?.[1] ?? []) {
			progressMap.set(String(row.IRECURSO), row.QSEGVISTO ?? 0);
		}

		let vistos = 0;
		let totalConRecurso = 0;
		let duracionTotal = 0;

		for (const plan of curso.planescurso) {
			if (!plan.irecurso) continue;
			totalConRecurso++;
			const recursoJson = plan.recurso?.toJSON() || {};
			Object.assign(plan, recursoJson)
			plan.atributosrecurso = [...(plan.atributosplan ?? []), ...(plan.atributosrecurso ?? [])];

			const qsegvisto = progressMap.get(String(plan.irecurso)) ?? 0;
			plan.qtiempovisualizado = qsegvisto;
			const qsegmarcarvisto = plan.qsegmarcarvisto ?? 0;
			const visto = qsegmarcarvisto > 0 && qsegvisto >= (qsegmarcarvisto - 10);
			duracionTotal += qsegmarcarvisto;

			plan.recurso = null;
			plan.atributosplan = null;
			plan.estructuranivel = null;

			if (visto) vistos++;
		}
		curso.qprogreso = totalConRecurso > 0 ? Math.round((vistos / totalConRecurso) * 100) : 0;
		curso.qtotalrecursos = totalConRecurso;
		curso.qduracion = duracionTotal;
		return curso;
	}
```

## Implementación · sincronización de hijas (PUT)

`TCapacitacionServer` define dos primitivas: `deepPromiseInsertQry`
borra-y-reinsertan en bloque las hijas, y `syncDetails` orquesta varias
controladoras hijas en paralelo dentro de la misma transacción.

```typescript
	protected deepPromiseInsertQry<P extends TObject>(main: P, details: TArray<T>, identity: Array<keyof T>, propagateFx?: (item: T) => [TDetailsInsert, any][]): Array<Promise<TObjectQuery>> {
		if (!details?.length) return [];
		const kmain = (f: any) => (main as any)[String(f)];
		details.forEach((item) => identity.forEach((f) => ((item as any)[f] = kmain(f))));
		return [
			Promise.resolve({ sql: `DELETE FROM ${this.NTbl} WHERE ${identity.map((f) => `${String(f).toUpperCase()}='${kmain(f)}'`).join(" AND ")};` }),
			...details.map((item) => this.InsertAsQry(item)),
			...(propagateFx ? details.flatMap((item) => (propagateFx(item) || []).flatMap(([C, l]) => new C(this.CtxUser).PromiseInsertQry(item, l ?? new TArray()))) : []),
		];
	}
```

```typescript
export class TPlanEstudioServer extends TCapacitacionPlanDeEstudioServer<TPlanDeEstudio> {
	get NTbl(): string { return tablas.ntblCapacPlanesEstudio }
	get Klass(): typeof TPlanDeEstudio { return TPlanDeEstudio }
	get PrimaryKeys(): Array<string> { return ["iplanestudio"] }
	JData2HighDetail = (): iInfoPlanEstudio => ({ cursosdeplanestudio: { todo }, prerrequisitos: { todo } })
	nestedConfig(JData: iInfoPlanEstudio): TNestedSqlCfgList {
		return [
			{ consulta: [TCursoDePlanDeEstudioServer, JData.cursosdeplanestudio], comparacion: ["IPLANESTUDIO"], esLista, as: "cursosdeplanestudio" },
			{ consulta: [TCursoPrerequisitoServer, JData.prerrequisitos], comparacion: ["IPLANESTUDIO"], esLista, as: "prerrequisitos" },
		];
	}

	// Método para obtener el detalle completo de un plan de estudio, incluyendo el progreso de los cursos y recursos asociados.
	public async obtenerDetallePlanEstudio(planEstudio: TPlanDeEstudio): Promise<TPlanDeEstudio> {
		await this.VerifyAuthorization();

		const JData: iInfoPlanEstudio = {
			cursosdeplanestudio: { curso: { planescurso: { recurso: { atributosrecurso: {} }, atributosplan: {} } } },
			prerrequisitos: {},
		}

		let ctrAuditoria: TAuditoriaController = new TAuditoriaController(this.CtxUser);
		let [idauditoria]: Array<any> = await ctrAuditoria.LookUp(['idauditoria'], {
			itercero: this.itercero,
			irol: this.irol,
			igrupo: this.igrupo,
			icontacto: this.icontacto
		}, true);

		const M = tablas.ntblRecursoMovimientoContacto;
		const P = tablas.ntblCapacPlanesCursos;
		const CP = tablas.ntblCapacCursosDePlanesEstudio;

		const Query = await ExecuteQuery({
			sql: `SELECT TOP 1 P.*
				FROM ${this.sqlDetalle(JData)} AS P WHERE P.IPLANESTUDIO = @iplanestudio;
				SELECT P2.ICURSO, P2.IRECURSO, COALESCE(SUM(M2.QSEGVISUALIZACION), 0) AS QSEGVISTO, MAX(M2.FHVISTO) AS FHVISTO
				FROM ${P} P2
				INNER JOIN ${CP} CP2 ON CP2.ICURSO = P2.ICURSO
				LEFT JOIN ${M} M2 ON M2.IRECURSO = P2.IRECURSO AND M2.IDAUDCRE = @idauditoria
				WHERE CP2.IPLANESTUDIO = @iplanestudio AND P2.IRECURSO IS NOT NULL
				GROUP BY P2.ICURSO, P2.IRECURSO`,
			params: [
				{ name: "iplanestudio", type: mssql.VarChar, value: planEstudio.iplanestudio },
				{ name: "idauditoria", type: mssql.Int, value: idauditoria ?? 0 },
			],
		});

		Object.assign(planEstudio, val2TObject(Query.recordset?.[0], TPlanDeEstudio));

		const progressMap = new Map<string, Map<string, { qsegvisto: number, fhvisto: Date | null }>>();
		const recordsets = Array.isArray(Query.recordsets) ? Query.recordsets : [];
		for (const row of recordsets?.[1] ?? []) {
			const icurso = String(row.ICURSO);
			if (!progressMap.has(icurso)) progressMap.set(icurso, new Map());
			progressMap.get(icurso)!.set(String(row.IRECURSO), { qsegvisto: row.QSEGVISTO ?? 0, fhvisto: row.FHVISTO ?? null });
		}

		planEstudio.qtotalcursos = planEstudio.cursosdeplanestudio?.length || 0;

		let totalRecursos = 0;
		let totalVistos = 0;
		let totalDuracion = 0;
		let fhContinuar: Date | null = null;

		for (let cursoDePlan of planEstudio.cursosdeplanestudio) {
			const curso = cursoDePlan.curso;
			if (!curso?.planescurso) continue;
			curso.planescurso.sort((a: any, b: any) => (a.qorden ?? 0) - (b.qorden ?? 0));

			const cursoProgressMap = progressMap.get(String(cursoDePlan.icurso)) ?? new Map();
			let vistos = 0;
			let totalConRecurso = 0;
			let sumaCalificaciones = 0;
			let totalConCalificacion = 0;

			for (const plan of curso.planescurso) {
				if (!plan.irecurso) continue;
				totalConRecurso++;
				const recursoJson = plan.recurso?.toJSON() || {};
				Object.assign(plan, recursoJson);

				const progreso = cursoProgressMap.get(String(plan.irecurso));
				const qsegvisto = progreso?.qsegvisto ?? 0;
				plan.qtiempovisualizado = qsegvisto;
				const qsegmarcarvisto = plan.recurso?.qsegmarcarvisto ?? 0;
				const visto = qsegmarcarvisto > 0 && qsegvisto >= (qsegmarcarvisto - 10);
				totalDuracion += qsegmarcarvisto;

				if (!visto && progreso?.fhvisto && (!fhContinuar || progreso.fhvisto > fhContinuar)) {
					fhContinuar = progreso.fhvisto;
					planEstudio.irecursocontinuar = String(plan.irecurso);
				}
				
				if (plan.recurso?.qcalificacion != null) {
					sumaCalificaciones += plan.recurso.qcalificacion;
					totalConCalificacion++;
				}

				plan.atributosrecurso = [...(plan.atributosplan ?? []), ...(plan.recurso?.atributosrecurso ?? [])];
				plan.recurso = null;
				plan.atributosplan = null;
				plan.estructuranivel = null;

				if (visto) vistos++;
			}

			curso.qrecursosfinalizados = vistos;
			curso.qprogreso = totalConRecurso > 0 ? Math.round((vistos / totalConRecurso) * 100) : 0;
			curso.qtotalrecursos = totalConRecurso;
			curso.qcalificacion = totalConCalificacion > 0 ? Math.round(sumaCalificaciones / totalConCalificacion) : 0;
			curso.qtotalCalificaciones = totalConCalificacion;
			totalRecursos += totalConRecurso;
			totalVistos += vistos;
		}

		planEstudio.qduracion = totalDuracion;
		planEstudio.qprogreso = totalRecursos > 0 ? Math.round((totalVistos / totalRecursos) * 100) : 0;
		planEstudio.qtotalrecursos = totalRecursos;

		return planEstudio
	}

	InsertQryDetalle(planestudio: TPlanDeEstudio): Promise<TObjectQuery> { return this.syncDetails(planestudio, [TCursoDePlanDeEstudioServer, planestudio.cursosdeplanestudio], [TCursoPrerequisitoServer, planestudio.prerrequisitos]) }
	PromiseInsertQry(src: TObject, lista: TArray<TPlanDeEstudio>): Array<Promise<TObjectQuery>> {
		return this.deepPromiseInsertQry(src, lista, ["iplanestudio"], (item) => [
			[TCursoDePlanDeEstudioServer, item.cursosdeplanestudio],
			[TCursoPrerequisitoServer, item.prerrequisitos],
		]);
	}
}
```

## Implementación · anidamiento SQL (consulta del Curso)

`nestedConfig` declara qué hijos se anidan en cada SELECT. El helper
`sqlNesting` genera subconsultas con `FOR JSON` para devolver el árbol
completo en un solo round-trip.

```typescript
	nestedConfig(JData: iInfoCurso): TNestedSqlCfgList {
		const pivotPlan = `${tablas.ntblCapacCursosDePlanesEstudio}_`;
		return [
			{ consulta: [TTemasController, JData.tema], comparacion: ["ITEMA"], as: "tema" },
			{ consulta: [TDriverServer, JData.driver], comparacion: ["IDRIVER"], as: "driver" },
			{ consulta: [TSeguridadCursoServer, JData.seguridades], comparacion: ["ICURSO"], esLista, as: "seguridades" },
			{ consulta: [TEstructuraCursoServer, JData.estructuras], comparacion: ["ICURSO"], esLista, as: "estructuras" },
			{ consulta: [TPlanCursoServer, JData.planescurso], comparacion: ["ICURSO"], esLista, as: "planescurso", where: (sub, parent) => (parent.startsWith(pivotPlan) ? `${sub}.IPLAN=${parent}.IPLANESTUDIO` : "") },
		];
	}
```
