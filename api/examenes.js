export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const URL_SHEETS = 'https://script.google.com/macros/s/AKfycbxSFsVfcXChORFlideOqNZfeKTRtVx_FmJqWPo6ThQtrPyz3YpU6UqZiLyNv0I8uK_OBg/exec';
  
  try {
    const [generales, oftalmo] = await Promise.all([
      fetch(URL_SHEETS + '?sheet=ExamenesGenerales').then(r => r.json()),
      fetch(URL_SHEETS + '?sheet=ExamenesOftalmo').then(r => r.json())
    ]);
    
    res.status(200).json({ generales, oftalmo });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
