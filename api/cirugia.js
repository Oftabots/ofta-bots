import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // ---- NUEVO: verificación de PIN de la contingencia ----
  // Solo entra aquí si el request es POST y trae accion:'verificarPin'.
  // Cualquier otro request (como los que ya hace tu bot de cirugía) sigue
  // exactamente el mismo camino de siempre, más abajo, sin pasar por aquí.
  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') body = JSON.parse(body);

      if (body && body.accion === 'verificarPin') {
        const { data, error } = await supabase
          .schema('oftabots')
          .from('contingencia_config')
          .select('valor')
          .eq('clave', 'pin_acceso')
          .single();

        if (error) throw error;

        const correcto = data && data.valor === body.pin;
        return res.status(200).json({ ok: !!correcto });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // ---- EXISTENTE: exactamente igual a como estaba, sin ningún cambio ----
  try {
    const { data, error } = await supabase
      .schema('oftabots')
      .from('cirugias')
      .select('cups, nombre, obs, riesgos, beneficios, alternativa');

    if (error) throw error;

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
