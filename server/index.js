import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Category from './models/Category.js';
import User from './models/User.js';
import Serial from './models/Serial.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Replace <db_username> with actual username from env or use provided URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/hugelabz';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---

// Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Users & Auth
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });
    
    const newUser = new User({ email, password, name });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serials
app.get('/api/serials', async (req, res) => {
  try {
    const serials = await Serial.find().populate('productId');
    res.json(serials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/serials', async (req, res) => {
  try {
    const newSerial = new Serial(req.body);
    await newSerial.save();
    res.json(newSerial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/serials/verify', async (req, res) => {
  try {
    const { code, userId } = req.body;
    const serial = await Serial.findOne({ code: { $regex: new RegExp(code, 'i') } }).populate('productId');
    
    if (!serial) return res.status(404).json({ error: 'Serial number not found' });
    
    serial.isVerified = true;
    serial.verifiedAt = new Date();
    if (userId) serial.verifiedBy = userId;
    await serial.save();
    
    res.json({ success: true, serial, product: serial.productId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/serials/:id', async (req, res) => {
  try {
    await Serial.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
