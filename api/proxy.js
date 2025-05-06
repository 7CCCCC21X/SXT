// api/proxy.js
export default async function handler(req, res) {
  const { address } = req.query;
  if (!address) return res.status(400).json({ error: 'Missing address' });

  try {
    const upstream = await fetch(`https://gigaclaim.spaceandtime.io/api/eligibility?address=${address}`);
    const data = await upstream.json();
    res.setHeader('Access-Control-Allow-Origin', '*');  // 允许前端访问
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy request failed' });
  }
}
