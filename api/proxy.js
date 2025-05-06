export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Missing address' });
  }

  const targetUrl = `https://gigaclaim.spaceandtime.io/api/eligibility?address=${address}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Referer': 'https://gigaclaim.spaceandtime.io/',
        'User-Agent': req.headers['user-agent'],
        'x-kl-saas-ajax-request': 'Ajax_Request',
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch', detail: err.message });
  }
}
