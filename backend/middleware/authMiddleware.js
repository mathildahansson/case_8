import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // kontrollera att authorization-headern finns
    if (!authHeader) {
        return res.status(401).json({
            error: 'Authorization header is missing. Please provide a Bearer token.',
        });
    }

    // token finns i "authorization"-headern (Bearer TOKEN)
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access token required...' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token...' });

        req.user = user; // lägg till användardata i request-objektet
        next();
    });
};

export default authenticateToken;
