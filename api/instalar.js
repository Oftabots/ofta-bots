export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Instalar Oftabots</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: sans-serif; background: #F0F6FF; min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 30px 16px; }
.logo { font-size: 32px; margin-bottom: 6px; }
h1 { color: #185FA5; font-size: 22px; margin-bottom: 4px; }
.sub { color: #666; font-size: 14px; margin-bottom: 30px; }
.card { background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); padding: 24px; width: 100%; max-width: 480px; margin-bottom: 16px; }
.card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.card-header span { font-size: 24px; }
.card-header h2 { font-size: 16px; color: #185FA5; }
.instruccion { font-size: 13px; color: #555; margin-bottom: 14px; line-height: 1.5; }
.bot-link { display: flex; align-items: center; justify-content: space-between; background: #F0F6FF; border: 1px solid #B5D4F4; border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; }
.bot-info { display: flex; align-items: center; gap: 10px; }
.bot-emoji { font-size: 20px; }
.bot-nombre { font-size: 14px; font-weight: 500; color: #0C447C; }
.bot-desc { font-size: 11px; color: #888; }
.drag-hint { font-size: 11px; color: #185FA5; background: #E6F1FB; padding: 4px 10px; border-radius: 20px; white-space: nowrap; }
.step { display: flex; gap: 10px; margin-bottom: 10px; align-items: flex-start; }
.step-num { background: #185FA5; color: white; border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0; margin-top: 1px; }
.step-txt { font-size: 13px; color: #444; line-height: 1.5; }
.footer { font-size: 12px; color: #aaa; margin-top: 10px; text-align: center; }
a { color: #0C447C; text-decoration: none; }
</style>
</head>
<body>
<div class="logo">&#x1F916;</div>
<h1>Oftabots</h1>
<p class="sub">Instala tus bots en la barra de marcadores</p>

<div class="card">
  <div class="card-header"><span>&#x1F680;</span><h2>Tus Bots</h2></div>
  <p class="instruccion">Arrastra cada bot a tu barra de marcadores:</p>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">&#x1F4CB;</span>
      <div><div class="bot-nombre"><a id="link-historia" href="#">Inicio</a></div><div class="bot-desc">Abre historia clinica en cualquier sede</div></div>
    </div><span class="drag-hint">&#x2190; Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">&#x1F4DD;</span>
      <div><div class="bot-nombre"><a id="link-notas" href="#">Notas</a></div><div class="bot-desc">Historia Clinica Oftalmologica</div></div>
    </div><span class="drag-hint">&#x2190; Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">&#x1F52C;</span>
      <div><div class="bot-nombre"><a id="link-examenes" href="#">Examenes</a></div><div class="bot-desc">Solicitud de examenes</div></div>
    </div><span class="drag-hint">&#x2190; Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">&#x1F52A;</span>
      <div><div class="bot-nombre"><a id="link-cirugia" href="#">Cirugia</a></div><div class="bot-desc">Prequirurgicos y consentimiento</div></div>
    </div><span class="drag-hint">&#x2190; Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">&#x1F48A;</span>
      <div><div class="bot-nombre"><a id="link-formulacion" href="#">Formulacion</a></div><div class="bot-desc">Formula medica oftalmologica</div></div>
    </div><span class="drag-hint">&#x2190; Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">&#x1F6E0;&#xFE0F;</span>
      <div><div class="bot-nombre"><a id="link-inicioprocedimientos" href="#">Inicio Procedimientos</a></div><div class="bot-desc">Abre folio HC095 y prepara Historia Clinica</div></div>
    </div><span class="drag-hint">&#x2190; Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">&#x1F6E0;&#xFE0F;</span>
      <div><div class="bot-nombre"><a id="link-procedimientos" href="#">Procedimientos</a></div><div class="bot-desc">Solicitud de procedimientos diagnosticos</div></div>
    </div><span class="drag-hint">&#x2190; Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">&#x1F4CA;</span>
      <div><div class="bot-nombre"><a id="link-pacientes" href="#">Productividad</a></div><div class="bot-desc">Exportar listado de pacientes a Sheets</div></div>
    </div><span class="drag-hint">&#x2190; Arrastra</span>
  </div>
</div>

<div class="card">
  <div class="card-header"><span>&#x1F4CB;</span><h2>Instrucciones</h2></div>
  <div class="step"><div class="step-num">1</div><div class="step-txt">Asegurate de tener visible la <strong>barra de marcadores</strong> en Chrome (Ctrl + Shift + B)</div></div>
  <div class="step"><div class="step-num">2</div><div class="step-txt">Arrastra cada bot desde aqui hasta la barra de marcadores</div></div>
  <div class="step"><div class="step-num">3</div><div class="step-txt">Usalos directamente desde Dinamica</div></div>
</div>

<p class="footer">Oftabots 2026 - Solo para uso autorizado</p>

<script>
fetch('/api/bots').then(r=>r.json()).then(bots=>{
  document.getElementById('link-historia').href = bots.historia;
  document.getElementById('link-notas').href = bots.notas;
  document.getElementById('link-examenes').href = bots.examenes;
  document.getElementById('link-cirugia').href = bots.cirugia;
  document.getElementById('link-formulacion').href = bots.formulacion;
  document.getElementById('link-inicioprocedimientos').href = bots.inicioprocedimientos;
  document.getElementById('link-procedimientos').href = bots.procedimientos;
  document.getElementById('link-pacientes').href = bots.pacientes;
});
</script>
</body>
</html>`);
}
