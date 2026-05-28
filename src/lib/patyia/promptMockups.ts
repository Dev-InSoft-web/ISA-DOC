export interface PromptMockup {
	id: string;
	label: string;
	text: string;
}

export const PROMPT_MOCKUPS: PromptMockup[] = [
	{
		id: "consulta_tiquete_estado",
		label: "Consulta · estado de tiquete",
		text: "Buenos días, quiero saber el estado del tiquete 12345 que reporté la semana pasada.",
	},
	{
		id: "consulta_factura_pendiente",
		label: "Consulta · factura pendiente",
		text: "Tengo una factura del mes de marzo que aparece pendiente, ya hice el pago el día 12. ¿Pueden verificar?",
	},
	{
		id: "soporte_error_login",
		label: "Soporte · error de login",
		text: "No puedo iniciar sesión en ContaPyme. Me sale el mensaje 'usuario o contraseña incorrectos' pero estoy seguro que están bien.",
	},
	{
		id: "solicitud_capacitacion",
		label: "Solicitud · capacitación",
		text: "Necesito capacitación para el módulo de Inventarios. Somos 3 personas nuevas y queremos agendar una sesión.",
	},
	{
		id: "reclamo_cobro_indebido",
		label: "Reclamo · cobro indebido",
		text: "Me cobraron dos veces la licencia este mes. Adjunto los comprobantes de pago. Necesito que me devuelvan el valor duplicado.",
	},
	{
		id: "consulta_nomina_calculo",
		label: "Consulta · cálculo de nómina",
		text: "Estoy liquidando la nómina de mayo y el sistema no está calculando bien las horas extras nocturnas. ¿Cómo se configura el recargo?",
	},
	{
		id: "soporte_backup_falla",
		label: "Soporte · falla en backup",
		text: "El backup automático lleva 3 días fallando. En el log aparece 'no se pudo acceder a la ruta'. La empresa es ABC SAS NIT 900123456.",
	},
	{
		id: "consulta_dian_certificado",
		label: "Consulta · DIAN certificado",
		text: "Necesito generar el certificado de retención en la fuente para un proveedor del año gravable 2025. ¿Por dónde lo genero?",
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
