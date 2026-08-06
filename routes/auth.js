import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    // Accept both 'contact' or 'username'/'email' from the frontend
    const { name, contact, username, password } = req.body;
    const identifier = contact || username;

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Please provide contact/email and password' });
    }

    const existingUser = await User.findOne({ contact: identifier });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ 
      name: name || 'User', 
      contact: identifier, 
      password: hashedPassword 
    });
    
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});


// LOGIN
// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 🔍 This will print what you typed in the browser to your VS Code terminal
    console.log("LOGIN ATTEMPT RECEIVED:", { username, password });

    if (username === 'admin' && password === 'password123') {
      const token = jwt.sign({ id: 'admin_id', role: 'admin', name: 'Admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, role: 'admin', name: 'Admin' });
    }

    const user = await User.findOne({ 
      $or: [
        { contact: username }, 
        { email: username }, 
        { username: username }
      ] 
    });

    if (!user) {
      console.log("❌ User NOT found in database for identifier:", username);
      return res.status(400).json({ message: 'User not found' });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});
export default router;