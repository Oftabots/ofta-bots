export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const notasHref = "javascript:(async function(){async function validarLicencia(bot){const KEY='ofta_lic_'+bot;const KEY_T='ofta_lic_t_'+bot;const ahora=Date.now();const guardado=sessionStorage.getItem(KEY);const tiempo=sessionStorage.getItem(KEY_T);if(guardado&&tiempo&&(ahora-parseInt(tiempo))<10800000)return JSON.parse(guardado);const nombre=document.querySelector('.content-text')?.textContent?.trim();if(!nombre)return{autorizado:false,mensaje:'No se detect\u00f3 usuario de Din\u00e1mica'};const r=await fetch('https://ofta-bots.vercel.app/api/licencia?nombre='+encodeURIComponent(nombre)+'&bot='+bot);const data=await r.json();sessionStorage.setItem(KEY,JSON.stringify(data));sessionStorage.setItem(KEY_T,String(ahora));return data;}const lic=await validarLicencia('notas');if(!lic.autorizado){alert('\u26d4 '+lic.mensaje);return;}if(document.getElementById('bot-notas-overlay')){document.getElementById('bot-notas-overlay').remove();}function setNativeValue(el,val){const proto=el.tagName==='TEXTAREA'?window.HTMLTextAreaElement.prototype:window.HTMLInputElement.prototype;const setter=Object.getOwnPropertyDescriptor(proto,'value').set;setter.call(el,val);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));}function normalizarNota(texto){let t=texto.replace(/\\r\\n/g,'\\n').replace(/\\r/g,'\\n');t=t.replace(/([^\\n]) +(AV(?=[\\s:\\/]))/gi,'$1\\n$2');t=t.replace(/([^\\n]) +(BIO(?=[\\s:]))/gi,'$1\\n$2');t=t.replace(/([^\\n]) +(FO(?=\\s+(?:LENTE|OJO|AO|OD|OI)))/gi,'$1\\n$2');t=t.replace(/([^\\n]) +(PAT\\s*:)/gi,'$1\\n$2');t=t.replace(/([^\\n]) +(ALERG\\s*:)/gi,'$1\\n$2');t=t.replace(/([^\\n]) +(FAMILIARES\\s*:)/gi,'$1\\n$2');t=t.replace(/([^\\n]) +(PACIENTE CON (?:DX|DIAGN))/gi,'$1\\n$2');t=t.replace(/([^\\n]) +(\\d+\\. [A-Z\u00c1\u00c9\u00cd\u00d3\u00da\u00d1])/g,'$1\\n$2');return t;}function splitNota(texto){const t=normalizarNota(texto);const lines=t.split('\\n');let idxExamen=-1;for(let i=0;i<lines.length;i++){if(/^\\s*AV(?=[\\s:\\/])/i.test(lines[i])){idxExamen=i;break;}}if(idxExamen===-1){for(let i=0;i<lines.length;i++){if(/^\\s*BIO(?=[\\s:])/i.test(lines[i])){idxExamen=i;break;}}}const enfermedadActual=idxExamen===-1?t.trim():lines.slice(0,idxExamen).join('\\n').trim();let idxPaciente=-1;for(let i=(idxExamen===-1?0:idxExamen);i<lines.length;i++){if(/^\\s*PACIENTE\\s+CON\\s+(DX|DIAGN[O\u00d3]STICOS?)\\b/i.test(lines[i])){idxPaciente=i;break;}}const examenOftalmologico=(idxExamen===-1||idxPaciente===-1)?'':lines.slice(idxExamen,idxPaciente).join('\\n').trim();let analisisLines=[];let idxPlanInicio=-1;if(idxPaciente!==-1){analisisLines.push(lines[idxPaciente]);let i=idxPaciente+1;while(i<lines.length&&/^\\s*\\d+\\.\\s*/.test(lines[i])){analisisLines.push(lines[i]);i++;}idxPlanInicio=i;}const analisis=analisisLines.join('\\n').trim();const planManejo=idxPlanInicio===-1?'':lines.slice(idxPlanInicio).join('\\n').trim();return{enfermedadActual,examenOftalmologico,analisis,planManejo};}const CAMPOS={enfermedadActual:'in_HCCM03N10',examenOftalmologico:'in_HCCM03N12',analisis:'in_HCCM03N27',planManejo:'in_HCCM03N28'};function rasparCampos(){return Object.values(CAMPOS).map(name=>(document.querySelector('textarea[name=\"'+name+'\"]')?.value||'').trim()).filter(v=>v).join('\\n');}const overlay=document.createElement('div');overlay.id='bot-notas-overlay';overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:999998;display:flex;align-items:center;justify-content:center;';const modal=document.createElement('div');modal.style.cssText='background:#fff;border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,0.25);width:min(780px,95vw);max-height:92vh;display:flex;flex-direction:column;font-family:sans-serif;overflow:hidden;';const header=document.createElement('div');header.style.cssText='background:#185FA5;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;';header.innerHTML='<div style=\"display:flex;align-items:center;gap:10px;\"><span style=\"font-size:18px;\">\ud83d\udcdd</span><div><div style=\"color:white;font-size:15px;font-weight:700;line-height:1.2;\">Historia Cl\u00ednica Oftalmol\u00f3gica</div><div style=\"color:#B5D4F4;font-size:11px;margin-top:1px;\">Bot Notas \u2014 Oftabots</div></div></div>';const cerrar=document.createElement('span');cerrar.textContent='\u2715';cerrar.title='Cerrar';cerrar.style.cssText='color:#B5D4F4;cursor:pointer;font-size:20px;line-height:1;padding:4px;';cerrar.addEventListener('click',()=>overlay.remove());header.appendChild(cerrar);modal.appendChild(header);const body=document.createElement('div');body.style.cssText='padding:16px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:10px;';modal.appendChild(body);const labelNota=document.createElement('div');labelNota.textContent='Nota completa (editable):';labelNota.style.cssText='font-size:12px;font-weight:600;color:#0C447C;';body.appendChild(labelNota);const inputArea=document.createElement('textarea');inputArea.id='bn-input';inputArea.style.cssText='width:100%;box-sizing:border-box;padding:10px;border:1px solid #B5D4F4;border-radius:8px;font-size:13px;outline:none;resize:vertical;font-family:sans-serif;min-height:340px;line-height:1.5;';inputArea.placeholder='REFIERE...\\nPAT: ...\\nALERG: ...\\nAV ...\\nBIO ...\\nPACIENTE CON DX:\\n1. ...\\nSE DA...';body.appendChild(inputArea);const preexistente=rasparCampos();if(preexistente)inputArea.value=preexistente;const filaPlantilla=document.createElement('div');filaPlantilla.style.cssText='display:flex;gap:8px;align-items:flex-end;';const colSel=document.createElement('div');colSel.style.cssText='flex:1;';const labelP=document.createElement('div');labelP.textContent='Plantilla de finalizaci\u00f3n:';labelP.style.cssText='font-size:11px;font-weight:600;color:#0C447C;margin-bottom:4px;';const sel=document.createElement('select');sel.style.cssText='width:100%;padding:7px 8px;border:1px solid #B5D4F4;border-radius:8px;font-size:12px;outline:none;';sel.innerHTML='<option value=\"\">Cargando...</option>';colSel.appendChild(labelP);colSel.appendChild(sel);const btnP=document.createElement('button');btnP.textContent='+ A\u00f1adir';btnP.style.cssText='padding:7px 14px;background:#E6F1FB;color:#0C447C;border:1px solid #B5D4F4;border-radius:8px;font-weight:500;cursor:pointer;font-size:12px;white-space:nowrap;flex-shrink:0;';filaPlantilla.appendChild(colSel);filaPlantilla.appendChild(btnP);body.appendChild(filaPlantilla);const filaInferior=document.createElement('div');filaInferior.style.cssText='display:flex;align-items:flex-end;justify-content:space-between;gap:10px;';const clipInfo=document.createElement('div');clipInfo.style.cssText='font-size:10px;color:#888;background:#F5F9FF;border:1px solid #E6F1FB;border-radius:6px;padding:5px 10px;display:none;flex:1;';const status=document.createElement('div');status.style.cssText='font-size:11px;color:#666;white-space:pre-line;flex:1;';const colStatus=document.createElement('div');colStatus.style.cssText='flex:1;display:flex;flex-direction:column;gap:4px;';colStatus.appendChild(clipInfo);colStatus.appendChild(status);const btnAplicar=document.createElement('button');btnAplicar.textContent='\u25b6 Aplicar en Din\u00e1mica';btnAplicar.style.cssText='padding:10px 20px;background:#C0392B;color:white;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:13px;white-space:nowrap;flex-shrink:0;box-shadow:0 2px 8px rgba(192,57,43,0.4);';filaInferior.appendChild(colStatus);filaInferior.appendChild(btnAplicar);body.appendChild(filaInferior);overlay.appendChild(modal);document.body.appendChild(overlay);btnAplicar.addEventListener('click',async()=>{const texto=inputArea.value;if(!texto.trim()){status.style.color='orange';status.textContent='Escribe o pega una nota primero.';return;}try{await navigator.clipboard.writeText(texto);clipInfo.style.display='block';clipInfo.textContent='\ud83d\udccb Nota guardada en portapapeles \u2014 disponible si Din\u00e1mica se cae.';}catch(e){clipInfo.style.display='block';clipInfo.textContent='\u26a0 No se pudo guardar en portapapeles.';}const r=splitNota(texto);const avisos=[];for(const key of Object.keys(CAMPOS)){const campo=document.querySelector('textarea[name=\"'+CAMPOS[key]+'\"]');if(!campo){avisos.push('\u26a0 No encontr\u00e9 el cuadro de '+key);continue;}if(!r[key]){avisos.push('\u26a0 '+key+' qued\u00f3 vac\u00edo');}setNativeValue(campo,r[key]);await new Promise(res=>setTimeout(res,250));}status.style.color=avisos.length?'#B5651D':'#3B6D11';status.textContent=(avisos.length?avisos.join('\\n')+'\\n':'')+'\u2705 Aplicado en los 4 cuadros.';});let plantillas=[];fetch('https://ofta-bots.vercel.app/api/plantillas').then(r=>r.json()).then(data=>{plantillas=data;sel.innerHTML='<option value=\"\">Seleccionar...</option>'+plantillas.map((p,i)=>'<option value=\"'+i+'\">'+p.Nombre+'</option>').join('');}).catch(()=>{sel.innerHTML='<option value=\"\">Error cargando</option>';});btnP.addEventListener('click',()=>{const idx=sel.value;if(idx===''){status.style.color='orange';status.textContent='Elige una plantilla primero.';return;}const actual=inputArea.value.trim();inputArea.value=(actual?actual+'\\n':'')+plantillas[idx].Texto;status.style.color='#3B6D11';status.textContent='\u2705 Plantilla agregada. Dale \"Aplicar en Din\u00e1mica\" cuando est\u00e9s listo.';});})();void(0);";

  const productividadHref = "javascript:(async function(){async function validarLicencia(bot){const KEY='ofta_lic_'+bot;const KEY_T='oft_lic_t_'+bot;const ahora=Date.now();const guardado=sessionStorage.getItem(KEY);const tiempo=sessionStorage.getItem(KEY_T);if(guardado&&tiempo&&(ahora-parseInt(tiempo))<10800000)return JSON.parse(guardado);const nombre=document.querySelector('.content-text')?.textContent?.trim();if(!nombre)return{autorizado:false,mensaje:'No se detect\u00f3 usuario de Din\u00e1mica'};const r=await fetch('https://ofta-bots.vercel.app/api/licencia?nombre='+encodeURIComponent(nombre)+'&bot='+bot);const data=await r.json();sessionStorage.setItem(KEY,JSON.stringify(data));sessionStorage.setItem(KEY_T,String(ahora));return data;}const lic=await validarLicencia('pacientes');if(!lic.autorizado){alert('\u26d4 '+lic.mensaje);return;}const MESES={'01':'ENERO','02':'FEBRERO','03':'MARZO','04':'ABRIL','05':'MAYO','06':'JUNIO','07':'JULIO','08':'AGOSTO','09':'SEPTIEMBRE','10':'OCTUBRE','11':'NOVIEMBRE','12':'DICIEMBRE'};function leerFilasVisibles(registros,mesAnioRef){const filas=document.querySelectorAll('.dx-data-row');for(let i=0;i<filas.length;i++){const celdas=Array.from(filas[i].cells).filter(c=>c.getAttribute('role')==='gridcell');if(celdas.length<5)continue;try{const textoCita=celdas[1].querySelector('.divMultilinea')?.innerText?.trim()||'';const mFecha=textoCita.match(/(\\d{2})\\/(\\d{2})\\/(\\d{4})/);const fecha=mFecha?mFecha[1]+'/'+mFecha[2]+'/'+mFecha[3]:'';const mesNum=mFecha?mFecha[2]:'';const anio=mFecha?mFecha[3]:'';const mesAnioFila=(mesNum&&anio)?MESES[mesNum]+'/'+anio:'';if(mesAnioFila&&!mesAnioRef.val)mesAnioRef.val=mesAnioFila;const lineasCita=textoCita.split('\\n').map(l=>l.trim()).filter(Boolean);let tipoConsulta='OFTALMOLOGIA';for(const l of lineasCita){const lu=l.toUpperCase();if(lu.includes('OCULOPLASTICA')||lu.includes('OCULOPL\u00c1STICA')){tipoConsulta='OCULOPLASTICA';break;}if(lu.includes('OFTALMOLOGIA')||lu.includes('OFTALMOLOG\u00cdA')){tipoConsulta='OFTALMOLOGIA';break;}}const textoIngreso=celdas[3].querySelector('.divMultilinea')?.innerText?.trim()||'';const mFac=textoIngreso.match(/\\d{4,}/);const factura=mFac?mFac[0]:'NO ASISTIO';const textoPac=celdas[4].innerText?.trim()||'';const lineasPac=textoPac.split('\\n').map(l=>l.trim()).filter(Boolean);let numDoc='';let nombre='';for(const linea of lineasPac){if(/-\\s*\\d+/.test(linea)&&!/a\u00f1os/i.test(linea)){const m=linea.match(/-\\s*(\\d+)/);if(m)numDoc=m[1];}else if(linea===linea.toUpperCase()&&!/\\d/.test(linea)&&linea.length>4&&!/femenino|masculino/i.test(linea)){nombre=linea;}}const docKey=numDoc||nombre;if(docKey&&!registros.find(r=>r.documento===numDoc&&r.nombre===nombre)){registros.push({fecha,nombre,documento:numDoc,factura,tipoConsulta,procedimientoQX:'NO APLICA',mesAnio:mesAnioFila});}}catch(e){console.warn('Error fila '+i+': '+e.message);}}}const registros=[];const mesAnioRef={val:''};const contenedor=document.querySelector('.dx-datagrid-rowsview .dx-scrollable-container');if(contenedor){contenedor.scrollTop=0;await new Promise(r=>setTimeout(r,800));leerFilasVisibles(registros,mesAnioRef);let ultimaAltura=-1;while(contenedor.scrollTop!==ultimaAltura){ultimaAltura=contenedor.scrollTop;contenedor.scrollTop+=300;await new Promise(r=>setTimeout(r,1200));leerFilasVisibles(registros,mesAnioRef);}leerFilasVisibles(registros,mesAnioRef);}else{leerFilasVisibles(registros,mesAnioRef);}if(registros.length===0){alert('No se extrajeron registros.');return;}try{const resp=await fetch('https://ofta-bots.vercel.app/api/pacientes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mesAnio:mesAnioRef.val,registros})});const data=await resp.json();if(data.resultado&&data.resultado.includes('OK')){alert('OK: '+registros.length+' registros guardados. Mes: '+mesAnioRef.val);}else{alert('Respuesta: '+data.resultado);}}catch(e){alert('Error: '+e.message);}})();void(0);";

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
      <div><div class="bot-nombre"><a id="link-historia" href="#">Inicio</a></div><div class="bot-desc">Abre historia clinica en cualquier sede</div></div>
    </div><span class="drag-hint">\u2190 Arrastra</span>
  </div>

  <div class="bot-link">
    <div class="bot-info"><span class="bot-emoji">\u{1f4dd}</span>
      <div><div class="bot-nombre"><a id="link-notas" href="#">Notas</a></div><div class="bot-desc">Historia Clinica Oftalmologica</div></div>
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
document.getElementById('link-notas').href = ${JSON.stringify(notasHref)};
document.getElementById('link-productividad').href = ${JSON.stringify(productividadHref)};
</script>
</body>
</html>`);
}
