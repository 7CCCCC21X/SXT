// api/proxy.js
export default async function handler(req, res) {
  const { address } = req.query;
  if (!address) return res.status(400).json({ error: 'Missing address' });

  try {
    const r = await fetch(`https://gigaclaim.spaceandtime.io/api/eligibility?address=${address}`);
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Proxy request failed' });
  }
}
