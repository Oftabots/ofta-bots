import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const { data, error } = await supabase
      .schema('oftabots')
      .from('formula_medica')
      .select('nombre, principio_activo, presentacion, dosificacion');

    if (error) throw error;

    const formateado = data.map(item => ({
      nombre: item.nombre,
      principioActivo: item.principio_activo,
      presentacion: item.presentacion,
      dosificacion: item.dosificacion
    }));

    return res.status(200).json(formateado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
