// Plantilla común para los tickets de la bitácora.
// La persistencia de cada ticket guarda únicamente el cuerpo HTML
// (lo que va dentro del `<div style="font-size:12pt;">…</div>`),
// y el visor compone el documento completo con este wrapper.

export const TICKET_HTML_PREFIX = `<html>
<head>
    <style>
        body { font-family: Tahoma; }
        h3 { color: DodgerBlue; font-size: 14pt; margin-bottom: 5px; margin-top: 15px; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 10px; }
        th { background-color: DodgerBlue; color: white; text-align: left; padding: 5px; }
        td { padding: 5px; }
        tbody tr:nth-child(odd) { background-color: LightCyan; }
    </style>
</head>
<body>
    <div style="font-size:12pt;">
        <img src="https://i.ibb.co/99cnjWGK/01.png" style="max-height: 300px; max-width: 100%; display: block; margin-bottom: 15px;">
`;

export const TICKET_HTML_SUFFIX = `    </div>
</body>
</html>`;

export function buildTicketHtml(body: string): string {
	return TICKET_HTML_PREFIX + (body ?? "") + "\n" + TICKET_HTML_SUFFIX;
}
