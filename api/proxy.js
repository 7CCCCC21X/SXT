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
        'x-kl-saas-ajax-request': 'Ajax_Request'
      }
    });

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const body = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Target fetch failed', detail: body });
    }

    return res.status(200).json({ data: body });

  } catch (err) {
    console.error('❌ Proxy error:', err);
    res.status(500).json({ error: 'Server crashed', message: err.message });
  }
}
