export default async function handler(req, res) {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ error: 'Missing address' });
    }

    const targetUrl = `https://gigaclaim.spaceandtime.io/api/eligibility?address=${address}`;

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Referer': 'https://gigaclaim.spaceandtime.io/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'x-kl-saas-ajax-request': 'Ajax_Request'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Target fetch failed', detail: data });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error('Proxy error:', err);  // ✅ Vercel 日志会看到
    res.status(500).json({ error: 'Server crashed', message: err.message });
  }
}
