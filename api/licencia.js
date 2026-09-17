import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function normalizarNombre(nombre) {
  return nombre.trim().toUpperCase().split(/\s+/).sort().join(' ');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { nombre, bot } = req.query;

  if (!nombre || !bot) {
    return res.status(400).json({ autorizado: false, mensaje: 'Faltan parámetros' });
  }

  try {
    const nombreBuscado = normalizarNombre(nombre);

    const { data: usuario, error } = await supabase
      .schema('oftabots')
      .from('licencias')
      .select('*')
      .eq('nombre_normalizado', nombreBuscado)
      .maybeSingle();

    if (error) throw error;

    if (!usuario) {
      return res.status(200).json({ autorizado: false, mensaje: 'Usuario no encontrado' });
    }

    if (!usuario.activo) {
      return res.status(200).json({ autorizado: false, mensaje: 'Licencia inactiva' });
    }

    const hoy = new Date();
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
    console.error(error);
    return res.status(500).json({ autorizado: false, mensaje: 'Error del servidor' });
  }
}
