import express from 'express';
import Car from '../models/Car.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET ALL CARS
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD NEW CAR (Admin Only)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE CAR (Admin Only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;