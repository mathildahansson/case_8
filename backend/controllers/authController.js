import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// generera jwt-token
export const generateToken = (userData) => {
    const token = jwt.sign(
        { name: userData.name, email: userData.email }, // payload
        process.env.JWT_SECRET, // hemlig nyckel från miljövariabler
        { expiresIn: '1h' } // token giltig i 1 timme
    );
    return token;
};