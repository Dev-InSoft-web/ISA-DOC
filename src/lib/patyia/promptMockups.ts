export interface PromptMockup {
	id: string;
	label: string;
	text: string;
}

export const PROMPT_MOCKUPS: PromptMockup[] = [
	{
		id: "consulta_tiquete_estado",
		label: "Consulta ┬À estado de tiquete",
		text: "Buenos d├¡as, quiero saber el estado del tiquete 12345 que report├® la semana pasada.",
	},
	{
		id: "consulta_factura_pendiente",
		label: "Consulta ┬À factura pendiente",
		text: "Tengo una factura del mes de marzo que aparece pendiente, ya hice el pago el d├¡a 12. ┬┐Pueden verificar?",
	},
	{
		id: "soporte_error_login",
		label: "Soporte ┬À error de login",
		text: "No puedo iniciar sesi├│n en ContaPyme. Me sale el mensaje 'usuario o contrase├▒a incorrectos' pero estoy seguro que est├ín bien.",
	},
	{
		id: "solicitud_capacitacion",
		label: "Solicitud ┬À capacitaci├│n",
		text: "Necesito capacitaci├│n para el m├│dulo de Inventarios. Somos 3 personas nuevas y queremos agendar una sesi├│n.",
	},
	{
		id: "reclamo_cobro_indebido",
		label: "Reclamo ┬À cobro indebido",
		text: "Me cobraron dos veces la licencia este mes. Adjunto los comprobantes de pago. Necesito que me devuelvan el valor duplicado.",
	},
	{
		id: "consulta_nomina_calculo",
		label: "Consulta ┬À c├ílculo de n├│mina",
		text: "Estoy liquidando la n├│mina de mayo y el sistema no est├í calculando bien las horas extras nocturnas. ┬┐C├│mo se configura el recargo?",
	},
	{
		id: "soporte_backup_falla",
		label: "Soporte ┬À falla en backup",
		text: "El backup autom├ítico lleva 3 d├¡as fallando. En el log aparece 'no se pudo acceder a la ruta'. La empresa es ABC SAS NIT 900123456.",
	},
	{
		id: "consulta_dian_certificado",
		label: "Consulta ┬À DIAN certificado",
		text: "Necesito generar el certificado de retenci├│n en la fuente para un proveedor del a├▒o gravable 2025. ┬┐Por d├│nde lo genero?",
	},
	{
		id: "saludo_corto",
		label: "Saludo corto",
		text: "Hola",
	},
	{
		id: "mensaje_ambiguo",
		label: "Mensaje ambiguo",
		text: "no me funciona",
	},
];
