import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  type: [{ type: String }],
  condition: { type: String, enum: ['New', 'Used'], required: true },
  stock: { type: Number, default: 5 },
  price: { type: String, required: true },
  priceNum: { type: Number, required: true },
  fuel: { type: String, required: true },
  engine: { type: String, default: 'Not Specified' },
  power: { type: String, default: 'N/A' },
  seats: { type: Number, default: 5 },
  range: { type: String, default: 'N/A' },
  mileage: { type: String, default: 'N/A' },
  transmission: { type: String, required: true },
  image: { type: String, default: 'images/nexon-ev.jpg.avif' },
  parts: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Car', carSchema);