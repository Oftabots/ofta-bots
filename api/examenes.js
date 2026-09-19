import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const [{ data: generales, error: errGen }, { data: oftalmo, error: errOft }] = await Promise.all([
      supabase.schema('oftabots').from('examenes_generales').select('cups, nombre, obs'),
      supabase.schema('oftabots').from('examenes_oftalmo').select('cups, nombre, obs')
    ]);

    if (errGen) throw errGen;
    if (errOft) throw errOft;

    const generalesConTipo = generales.map(e => ({ ...e, tipo: 'general' }));
    const oftalmoConTipo = oftalmo.map(e => ({ ...e, tipo: 'oftalmologico' }));

    return res.status(200).json({ generales: generalesConTipo, oftalmo: oftalmoConTipo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
