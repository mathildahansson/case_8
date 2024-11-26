import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// mockad "databas" – du kan senare byta till en riktig databas
const users = [
  { id: 1, username: 'username123', password: 'password123' },
];

// logga in användare och generera jwt-token
export const loginUser = (req, res) => {
  const { username, password } = req.body;

  // validera inmatning
  if (!username || !password) {
    return res.status(400).json({ error: 'Användarnamn och lösenord krävs.' });
  }

  // hitta användaren i "databasen"
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Ogiltiga inloggningsuppgifter.' });
  }

  // skapa jwt-token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET, // hemlig nyckel från miljövariabler
    { expiresIn: '1h' } // token giltig i 1 timme
  );

  // skicka tillbaka token
  res.json({ token });
};
