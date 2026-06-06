export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const URL_SHEETS = 'https://script.google.com/macros/s/AKfycbxSFsVfcXChORFlideOqNZfeKTRtVx_FmJqWPo6ThQtrPyz3YpU6UqZiLyNv0I8uK_OBg/exec';
  
  try {
    const data = await fetch(URL_SHEETS + '?sheet=Cirugias').then(r => r.json());
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
