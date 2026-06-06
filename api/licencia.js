export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { email, bot } = req.query;
  
  if (!email || !bot) {
    return res.status(400).json({ autorizado: false, mensaje: 'Faltan parámetros' });
  }

  const URL_SHEETS = 'https://script.google.com/macros/s/AKfycbxSFsVfcXChORFlideOqNZfeKTRtVx_FmJqWPo6ThQtrPyz3YpU6UqZiLyNv0I8uK_OBg/exec';

  try {
    const data = await fetch(URL_SHEETS + '?sheet=Licencias').then(r => r.json());
    
    const hoy = new Date();
    const usuario = data.find(u => 
      u.email.toLowerCase().trim() === email.toLowerCase().trim()
    );

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
