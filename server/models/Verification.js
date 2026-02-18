import mongoose from 'mongoose';

const VerificationSchema = new mongoose.Schema({
  serialCode: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  verifiedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Verification', VerificationSchema);
