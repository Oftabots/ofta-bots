let cache = null;
let cacheTime = null;
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const URL_SHEETS = 'https://script.google.com/macros/s/AKfycbxSFsVfcXChORFlideOqNZfeKTRtVx_FmJqWPo6ThQtrPyz3YpU6UqZiLyNv0I8uK_OBg/exec';
  try {
    const ahora = Date.now();
    if (!cache || !cacheTime || (ahora - cacheTime) > 3600000) {
      const data = await fetch(URL_SHEETS + '?sheet=Plantillas').then(r => r.json());
      cache = data;
      cacheTime = ahora;
    }
    res.status(200).json(cache);
  } catch (error) {
    if (cache) {
      res.status(200).json(cache);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}
