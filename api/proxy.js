// api/proxy.js
export default async function handler(req, res) {
  const { address } = req.query;
  if (!address) return res.status(400).json({ error: 'Missing address' });

  try {
    const apiUrl = `https://gigaclaim.spaceandtime.io/api/eligibility?address=${address}`;
    const result = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });

    if (!result.ok) {
      const text = await result.text(); // 获取错误内容
      return res.status(result.status).json({ error: 'Upstream error', detail: text });
    }

    const data = await result.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);

  } catch (err) {
    console.error('Proxy failed:', err);
    return res.status(500).json({ error: 'Proxy error', detail: err.message });
  }
}
