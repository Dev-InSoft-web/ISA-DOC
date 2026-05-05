// Plantilla común para los tickets de la bitácora.
// La persistencia de cada ticket guarda únicamente el cuerpo HTML
// (lo que va dentro del `<div style="font-size:12pt;">…</div>`),
// y el visor compone el documento completo con este wrapper.

export const TICKET_HTML_PREFIX = `<html>
<head>
    <style>
        body { font-family: Tahoma; color: #777; text-shadow: 0 0 1px rgba(128,128,128,0.35); }
        h3 { color: DodgerBlue; font-size: 14pt; margin-top: 15px; margin-bottom: 12px; text-shadow: 0 0 1px rgba(30,144,255,0.35); }
        table { border-collapse: collapse; width: 100%; margin-bottom: 10px; font-size: small; }
        th { background-color: rgba(30, 144, 255, 0.9); color: white; text-align: left; padding: 5px; text-shadow: 0 0 1px rgba(0,0,0,0.4); }
        td { padding: 5px; }
        tbody tr:nth-child(odd) { background-color: rgba(30, 144, 255, 0.12); }
        code { font-family: Consolas, "Courier New", monospace; font-size: 0.92em; padding: 1px 5px; border-radius: 3px; background-color: rgba(128,128,128,0.18); color: #888; border: 1px solid rgba(128,128,128,0.25); text-shadow: none; }
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
