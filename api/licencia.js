let cache = null;
let cacheTime = null;

function normalizarNombre(nombre) {
  return nombre.trim().toUpperCase().split(/\s+/).sort().join(' ');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { nombre, bot } = req.query;
  
  if (!nombre || !bot) {
    return res.status(400).json({ autorizado: false, mensaje: 'Faltan parámetros' });
  }

  const URL_SHEETS = 'https://script.google.com/macros/s/AKfycbxSFsVfcXChORFlideOqNZfeKTRtVx_FmJqWPo6ThQtrPyz3YpU6UqZiLyNv0I8uK_OBg/exec';

  try {
    const ahora = Date.now();
    if (!cache || !cacheTime || (ahora - cacheTime) > 3600000) {
      const data = await fetch(URL_SHEETS + '?sheet=Licencias').then(r => r.json());
      cache = data;
      cacheTime = ahora;
    }

    const hoy = new Date();
    const nombreBuscado = normalizarNombre(nombre);
    
    const usuario = cache.find(u => normalizarNombre(u.nombre) === nombreBuscado);

    if (!usuario) {
      return res.status(200).json({ autorizado: false, mensaje: 'Usuario no encontrado' });
    }

    if (usuario.activo.toString().toLowerCase() !== 'true') {
      return res.status(200).json({ autorizado: false, mensaje: 'Licencia inactiva' });
    }

    const vencimiento = new Date(usuario.vencimiento);
    if (hoy > vencimiento) {
      return res.status(200).json({ autorizado: false, mensaje: 'Licencia vencida' });
    }

    const botsAutorizados = usuario.bots.split(',').map(b => b.trim().toLowerCase());
    if (!botsAutorizados.includes(bot.toLowerCase())) {
      return res.status(200).json({ autorizado: false, mensaje: 'Bot no incluido en tu licencia' });
    }

    return res.status(200).json({ autorizado: true, nombre: usuario.nombre });

  } catch (error) {
    return res.status(500).json({ autorizado: false, mensaje: 'Error del servidor' });
  }
}
