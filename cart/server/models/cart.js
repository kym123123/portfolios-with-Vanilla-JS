import mongoose from 'mongoose';

const { Schema } = mongoose;

const CartSchema = new Schema({
  product_id: String,
  number_of_product: Number,
  name: String,
  price: Number,
  imageUrl: String,
});

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;
