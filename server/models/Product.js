import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  tagline: { type: String },
  benefits: [{ type: String }],
  usage: { type: String },
  ingredients: { type: String },
  highlight: { type: String },
  goal: { type: String },
  servings: { type: String },
  supplementFacts: {
    servingSize: { type: String },
    servingsPerContainer: { type: String },
    nutrients: [{
      name: { type: String },
      amount: { type: String },
      dv: { type: String }
    }]
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Product', ProductSchema);
