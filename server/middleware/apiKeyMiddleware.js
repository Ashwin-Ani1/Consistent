const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.API_KEY;
    if (!apiKey || apiKey !== validApiKey) {
      return res.status(403).json({ error: 'Forbidden: Invalid or missing API key' });
    }
    next();
  };
  module.exports = apiKeyMiddleware;