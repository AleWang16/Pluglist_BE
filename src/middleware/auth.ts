const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

// Debug logging helper
const debug = (message, data = '') => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[AUTH] ${message}`, data);
    }
  };
  
export const verifyApiKey = (req, res, next) => {
    const publicPaths = ['/api/health', '/api-docs', '/'];
      // Skip authentication for public paths (exact match)
    if (publicPaths.includes(req.path)) {
        debug('verifyApiKey - Public path, skipping auth');
        return next();
    }
    
    debug('verifyApiKey - Checking auth for path:', req.path);
    debug('verifyApiKey - Headers:', JSON.stringify(req.headers, null, 2));
    
    try {
        const apiKey = req.headers['x-api-key'];
        const apiSecret = req.headers['x-api-secret'];

        // Check if required headers are present
        // if either is missing, return 401 and let them know which specific field is missing
        if (!apiKey) {
        debug('verifyApiKey - Missing required headers; API key is missing');
        return res.status(401).json({
            success: false,
            error: 'Missing required authentication headers. Include x-api-key in headers'
        });
        }

        if (!apiSecret) {
        debug('verifyApiKey - Missing required headers; API secret is missing');
        return res.status(401).json({
            success: false,
            error: 'Missing required authentication headers. Include x-api-secret in headers'
        });
        }

        debug('verifyApiKey - Received:', JSON.stringify({ 
        hasApiKey: !!apiKey, 
        hasApiSecret: !!apiSecret 
        }, null, 2));


        if (apiKey !== API_KEY || apiSecret !== API_SECRET) {
        debug('verifyApiKey - Invalid credentials; API key or secret is invalid');
        return res.status(403).json({ 
            success: false,
            error: 'Invalid API credentials. API key or secret is invalid' 
        });
        }
        
        debug('verifyApiKey - Success');

        next();
    } catch (error) {
        console.error('API key verification error:', error);
        res.status(500).json({ 
        success: false,
        error: 'Internal server error during API key verification' 
        });
    }
}