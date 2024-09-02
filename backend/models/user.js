import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  weight: { type: String, required: true }
}, { _id: false });

const userSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true },  // Firebase UID
  email: { type: String, required: true, unique: true },
  name: { type: String },
  profilePicture: { type: String },
  address: addressSchema,
  phoneNumber: { type: String },
  cart: {
    items: [cartItemSchema]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
