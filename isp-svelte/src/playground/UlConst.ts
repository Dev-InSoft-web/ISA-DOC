import type { ICtxAction } from "$lib";
import type { ICtxGrid, TGridColumn } from "$lib/base/Grid.svelte";
import type { ICtxBtnRef } from "$lib/form/BtnRef.svelte";
import { GetDisplayTextCheckBox } from "$lib/UlConst";
import { isBool, printDateTime, ServiciosInSoft, TArray, TControllerCatalogoGen, TObject, val2Bool, val2Float, val2Str, type TCampo, type TCampos, type TFiltro, type TFiltroLista, type TListaPaginacion } from "@ingenieria_insoft/ispgen";

export enum EnumString {
	none = "",
	FacturaVenta = "01", // Factura electrónica de Venta
	FacturaExportacion = "02", // Factura electrónica de venta - exportación
	InstrumentoElectronico = "03", // Instrumento electrónico de transmisión – tipo 03 (Transcripción de la factura de talonario o papel)
	FacturaTipo04 = "04", // Factura electrónica de Venta - tipo 04
	DocumentoSoporte = "05", // Documento de soporte
	NotaCredito = "91", // Nota Crédito (Exclusivo en referencias a documentos - elementos DocumentReference)
	NotaDebito = "92", // Nota Débito
	NotaAjuste = "95", // Nota de ajuste del documento soporte
	Eventos = "96", // Eventos (ApplicationResponse)
	NominaIndividual = "102", // Documento Soporte de Pago de Nómina Electrónica
	NominaIndividualDeAjuste = "103", // Nota de Ajuste de Documento Soporte de Pago de Nómina Electrónica
}

export enum EnumNumber {
	none = 0,
	RegistroCivil = 11,          // Registro civil
	TarjetaIdentidad = 12,       // Tarjeta de identidad
	CedulaCiudadania = 13,       // Cédula de ciudadanía
	TarjetaExtranjeria = 21,     // Tarjeta de extranjería
	CedulaExtranjeria = 22,      // Cédula de extranjería
	NIT = 31,                    // NIT
	Pasaporte = 41,              // Pasaporte
	IdentificacionExtranjero = 42, // Documento de identificación extranjero
	PEP = 47,                    // PEP
	NITOtroPais = 50,            // NIT de otro país
	NUIP = 91                    // NUIP (solo para el adquiriente)
}

const apps = [
	"ContaPmye",
	"AgroWin",
	"Microsoft Word",
	"Microsoft Excel",
	"Microsoft PowerPoint",
	"Microsoft Outlook",
	"Microsoft Teams",
	"OneNote",
	"Visual Studio Code",
	"Paint",
	"Notepad",
	"File Explorer",
];

export class TApp extends TObject {
	get app(): string { return this.f.app }
	set app(v: any) { this.f.app = val2Str(v) }

	get bactiva(): boolean { return this.f.bactiva }
	set bactiva(v: any) { this.f.bactiva = val2Bool(v) }
}

export class TMyGridController extends TControllerCatalogoGen<TApp> implements ICtxGrid<TApp> {
	entrie: string = "Aplicación";
	entries: string = "Aplicaciones";
	PrimaryKeys: Array<keyof TApp> = ["app"];
	get Klass(): typeof TObject {
		return TApp;
	}
	NEndPoint: string = "";
	NServer: ServiciosInSoft = ServiciosInSoft.SServer;
	Columns: TGridColumn<TApp> = {
		datosbd: {
			caption: "Datos BD",
			children:
			{
				app: {
					visible: true, caption: "Aplicacion",
					GetDisplayText: (val, record) => {
						if (!isBool(record)) return "";
						return "-" + val + "-";
					},
				},
				bactiva: { visible: true, caption: "Activa (random)", align: "center" }
			},
		},
		otrosdatos: {
			caption: "Otros Datos (calculados en tiempo de ejecución)",
			children: {
				primarios: {
					caption: "Primarios",
					children: {
						Valor: {
							caption: "Número (con formato)",
							align: "right",
							GetDisplayValue: async (val, record) => {
								if (!isBool(record)) return "";
								await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * (2000 - 100 + 1)) + 100));
								return val2Float((Math.random() * 10000000).toFixed(2));
							},
							GetDisplayText: (val, record) => val2Float(val).toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 2 }),
						},
						numero: {
							caption: "Número (sin formato)",
							align: "right",
							GetDisplayValue: async () => Math.floor(Math.random() * 10000000)
						}
					}
				},
				Secundarios: {
					children: {
						Fecha: {
							type: "date",
							GetDisplayValue: async () => new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
							GetDisplayText: (val) => val instanceof Date ? printDateTime(val) : ""
						},
						Bandera: {
							type: "bool",
							GetDisplayValue: async () => Math.random() < 0.5
						}
					}
				}
			}

		}


	};
	async Lista(_: TFiltroLista<TApp>): Promise<TListaPaginacion<TApp>> {
		return {
			pagina: 1,
			qregistros: 12,
			totalregistros: 12,
			totalpaginas: 1,
			datos: TArray.from({ length: 12 }, (_, i) => {
				const dato = new TApp();
				dato.app = apps[i];
				dato.bactiva = Math.round(Math.random());
				return dato;
			}) as TArray<TApp>
		}
	}
	/* Mock de Get para evitar conexion al servidor en el playground */
	async Get(Obj: TApp): Promise<boolean> {
		Obj.bactiva = true;
		return true;
	}
	async Insert(Obj: TApp): Promise<boolean> {
		return true;
	}
	async Update(Obj: TApp): Promise<boolean> {
		return true;
	}
	async Delete(Obj: TApp): Promise<boolean> {
		return true;
	}
}


export class TMyBtnRefController extends TMyGridController implements ICtxBtnRef<TApp> {
	ColumnsBtnRef = ["app"];
}

export class TMyCatalogoController extends TMyBtnRefController {

}
