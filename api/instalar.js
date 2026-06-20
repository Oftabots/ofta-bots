export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const productividadHref = "javascript:(async function(){async function validarLicencia(bot){const KEY='ofta_lic_'+bot;const KEY_T='oft_lic_t_'+bot;const ahora=Date.now();const guardado=sessionStorage.getItem(KEY);const tiempo=sessionStorage.getItem(KEY_T);if(guardado&&tiempo&&(ahora-parseInt(tiempo))<10800000)return JSON.parse(guardado);const nombre=document.querySelector('.content-text')?.textContent?.trim();if(!nombre)return{autorizado:false,mensaje:'No se detect\u00f3 usuario de Din\u00e1mica'};const r=await fetch('https://ofta-bots.vercel.app/api/licencia?nombre='+encodeURIComponent(nombre)+'&bot='+bot);const data=await r.json();sessionStorage.setItem(KEY,JSON.stringify(data));sessionStorage.setItem(KEY_T,String(ahora));return data;}const lic=await validarLicencia('pacientes');if(!lic.autorizado){alert('\u26d4 '+lic.mensaje);return;}const MESES={'01':'ENERO','02':'FEBRERO','03':'MARZO','04':'ABRIL','05':'MAYO','06':'JUNIO','07':'JULIO','08':'AGOSTO','09':'SEPTIEMBRE','10':'OCTUBRE','11':'NOVIEMBRE','12':'DICIEMBRE'};function leerFilasVisibles(registros,mesAnioRef){const filas=document.querySelectorAll('.dx-data-row');for(let i=0;i<filas.length;i++){const celdas=Array.from(filas[i].cells).filter(c=>c.getAttribute('role')==='gridcell');if(celdas.length<5)continue;try{const textoCita=celdas[1].querySelector('.divMultilinea')?.innerText?.trim()||'';const mFecha=textoCita.match(/(\d{2})\/(\d{2})\/(\d{4})/);const fecha=mFecha?mFecha[1]+'/'+mFecha[2]+'/'+mFecha[3]:'';const mesNum=mFecha?mFecha[2]:'';const anio=mFecha?mFecha[3]:'';const mesAnioFila=(mesNum&&anio)?MESES[mesNum]+'/'+anio:'';if(mesAnioFila&&!mesAnioRef.val)mesAnioRef.val=mesAnioFila;const lineasCita=textoCita.split('\n').map(l=>l.trim()).filter(Boolean);let tipoConsulta='OFTALMOLOGIA';for(const l of lineasCita){const lu=l.toUpperCase();if(lu.includes('OCULOPLASTICA')||lu.includes('OCULOPL\u00c1STICA')){tipoConsulta='OCULOPLASTICA';break;}if(lu.includes('OFTALMOLOGIA')||lu.includes('OFTALMOLOG\u00cdA')){tipoConsulta='OFTALMOLOGIA';break;}}const textoIngreso=celdas[3].querySelector('.divMultilinea')?.innerText?.trim()||'';const mFac=textoIngreso.match(/\d{4,}/);const factura=mFac?mFac[0]:'NO ASISTIO';const textoPac=celdas[4].innerText?.trim()||'';const lineasPac=textoPac.split('\n').map(l=>l.trim()).filter(Boolean);let numDoc='';let nombre='';for(const linea of lineasPac){if(/-\s*\d+/.test(linea)&&!/a\u00f1os/i.test(linea)){const m=linea.match(/-\s*(\d+)/);if(m)numDoc=m[1];}else if(linea===linea.toUpperCase()&&!/\d/.test(linea)&&linea.length>4&&!/femenino|masculino/i.test(linea)){nombre=linea;}}const docKey=numDoc||nombre;if(docKey&&!registros.find(r=>r.documento===numDoc&&r.nombre===nombre)){registros.push({fecha,nombre,documento:numDoc,factura,tipoConsulta,procedimientoQX:'NO APLICA',mesAnio:mesAnioFila});}}catch(e){console.warn('Error fila '+i+': '+e.message);}}}const registros=[];const mesAnioRef={val:''};const contenedor=document.querySelector('.dx-datagrid-rowsview .dx-scrollable-container');if(contenedor){contenedor.scrollTop=0;await new Promise(r=>setTimeout(r,800));leerFilasVisibles(registros,mesAnioRef);let ultimaAltura=-1;while(contenedor.scrollTop!==ultimaAltura){ultimaAltura=contenedor.scrollTop;contenedor.scrollTop+=300;await new Promise(r=>setTimeout(r,1200));leerFilasVisibles(registros,mesAnioRef);}leerFilasVisibles(registros,mesAnioRef);}else{leerFilasVisibles(registros,mesAnioRef);}if(registros.length===0){alert('No se extrajeron registros.');return;}try{const resp=await fetch('https://ofta-bots.vercel.app/api/pacientes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mesAnio:mesAnioRef.val,registros})});const data=await resp.json();if(data.resultado&&data.resultado.includes('OK')){alert('OK: '+registros.length+' registros guardados. Mes: '+mesAnioRef.val);}else{alert('Respuesta: '+data.resultado);}}catch(e){alert('Error: '+e.message);}})();void(0);";

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
<div class="logo">\u{1f916}</div>
<h1>Oftabots</h1>
<p class="sub">Instala tus bots en la barra de marcadores</p>

<div class="card">
  <div class="card-header"><span>\u{1f680}</span><h2>Tus Bots</h2></div>
  <p class="instruccion">Arrastra cada bot a tu barra de marcadores:</p>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">\u{1f4cb}</span>
      <div><div class="bot-nombre"><a id="link-historia" href="#">Historia</a></div><div class="bot-desc">Abre historia clinica en cualquier sede</div></div>
    </div><span class="drag-hint">\u2190 Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">\u{1f52c}</span>
      <div><div class="bot-nombre"><a id="link-examenes" href="#">Examenes</a></div><div class="bot-desc">Solicitud de examenes</div></div>
    </div><span class="drag-hint">\u2190 Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">\u{1f52a}</span>
      <div><div class="bot-nombre"><a id="link-cirugia" href="#">Cirugia</a></div><div class="bot-desc">Prequirurgicos y consentimiento</div></div>
    </div><span class="drag-hint">\u2190 Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">\u{1f48a}</span>
      <div><div class="bot-nombre"><a id="link-formulacion" href="#">Formulacion</a></div><div class="bot-desc">Formula medica oftalmologica</div></div>
    </div><span class="drag-hint">\u2190 Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">\u{1f6e0}\ufe0f</span>
      <div><div class="bot-nombre"><a id="link-inicioprocedimientos" href="#">Inicio Procedimientos</a></div><div class="bot-desc">Abre folio HC095 y prepara Historia Clinica</div></div>
    </div><span class="drag-hint">\u2190 Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">\u{1f6e0}\ufe0f</span>
      <div><div class="bot-nombre"><a id="link-procedimientos" href="#">Procedimientos</a></div><div class="bot-desc">Solicitud de procedimientos diagnosticos</div></div>
    </div><span class="drag-hint">\u2190 Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">\u{1f4ca}</span>
      <div><div class="bot-nombre"><a id="link-productividad" href="#">Productividad</a></div><div class="bot-desc">Exportar listado de pacientes a Sheets</div></div>
    </div><span class="drag-hint">\u2190 Arrastra</span>
  </div>
</div>

<div class="card">
  <div class="card-header"><span>\u{1f4cb}</span><h2>Instrucciones</h2></div>
  <div class="step"><div class="step-num">1</div><div class="step-txt">Asegurate de tener visible la <strong>barra de marcadores</strong> en Chrome (Ctrl + Shift + B)</div></div>
  <div class="step"><div class="step-num">2</div><div class="step-txt">Arrastra cada bot desde aqui hasta la barra de marcadores</div></div>
  <div class="step"><div class="step-num">3</div><div class="step-txt">Usalos directamente desde Dinamica</div></div>
</div>

<p class="footer">Oftabots 2026 - Solo para uso autorizado</p>

<script>
fetch('/api/bots').then(r=>r.json()).then(bots=>{
  document.getElementById('link-historia').href = bots.historia;
  document.getElementById('link-examenes').href = bots.examenes;
  document.getElementById('link-cirugia').href = bots.cirugia;
  document.getElementById('link-formulacion').href = bots.formulacion;
  document.getElementById('link-inicioprocedimientos').href = bots.inicioprocedimientos;
  document.getElementById('link-procedimientos').href = bots.procedimientos;
});
document.getElementById('link-productividad').href = ${JSON.stringify(productividadHref)};
</script>
</body>
</html>`);
}
