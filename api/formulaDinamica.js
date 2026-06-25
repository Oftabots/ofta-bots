let cache = null;
let cacheTime = 0;
const CACHE_TTL = 3600000;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const ahora = Date.now();
  if (cache && (ahora - cacheTime) < CACHE_TTL) {
    return res.status(200).json(cache);
  }
  try {
    const url = 'https://script.google.com/macros/s/AKfycbxSFsVfcXChORFlideOqNZfeKTRtVx_FmJqWPo6ThQtrPyz3YpU6UqZiLyNv0I8uK_OBg/exec?sheet=FormulaDinamica';
    const resp = await fetch(url);
    const data = await resp.json();
    cache = data;
    cacheTime = ahora;
    return res.status(200).json(data);
  } catch (e) {
    if (cache) return res.status(200).json(cache);
    return res.status(500).json({ error: e.message });
  }
}
