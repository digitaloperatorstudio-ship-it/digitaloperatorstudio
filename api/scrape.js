export default async function handler(req, res) {
  // Allow requests from any origin (needed for the artifact to call this)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;

  // Validate that a URL was provided
  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Basic URL validation
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Only allow http and https
  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return res.status(400).json({ error: 'Only http and https URLs are allowed' });
  }

  try {
    // Fetch the page from Vercel's server — no CORS issues here
    const response = await fetch(url, {
      headers: {
        // Pretend to be a regular browser so sites don't block us
        'User-Agent': 'Mozilla/5.0 (compatible; DOSBot/1.0)'
      },
      // Give up after 10 seconds
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      return res.status(502).json({ error: `Site returned ${response.status}` });
    }

    const html = await response.text();

    // Strip everything that isn't readable content
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<header[\s\S]*?<\/header>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 8000); // Keep well within Claude's token limits

    return res.status(200).json({ text });

  } catch (err) {
    return res.status(502).json({ error: 'Could not fetch the URL: ' + err.message });
  }
}
