import mongoose from 'mongoose';

const SerialSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  isVerified: { type: Boolean, default: false },
  verifiedAt: { type: Date },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Serial', SerialSchema);
