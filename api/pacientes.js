export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const URL_SHEETS = 'https://script.google.com/macros/s/AKfycbxSFsVfcXChORFlideOqNZfeKTRtVx_FmJqWPo6ThQtrPyz3YpU6UqZiLyNv0I8uK_OBg/exec';

  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);

    const resp = await fetch(URL_SHEETS, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(25000)
    });
    const texto = await resp.text();
    res.status(200).json({ resultado: texto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const config = {
  api: {
    bodyParser: { sizeLimit: '1mb' },
  },
};
