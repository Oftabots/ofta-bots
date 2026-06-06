export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const sede = req.query.sede || 'HSB';
  const codigos = {
    HSB: 'HSBA21',
    CAMI: 'SUBA21'
  };
  
  const codigoSede = codigos[sede] || 'HSBA21';
  
  res.status(200).json({ codigoSede, folio: 'HC152' });
}
