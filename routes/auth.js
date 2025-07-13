import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
const SECRET = 'jwt_secret';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    console.log('insert1', username, hashed)
    await db.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashed]
    );
    console.log('insert2')
    res.status(201).json({ message: 'User registered' });
    console.log('insert3')
  } catch (err) {
    console.log("err:", err)
    res.status(400).json({ error: 'Username already exists' , err});
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );

  if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, rows[0].password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: rows[0].id }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

export default router;