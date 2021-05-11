import dotenv from 'dotenv';
import Express from 'express';
import mongoose from 'mongoose';
import Cart from './models/cart.js';
import Product from './models/product.js';
import cors from 'cors';

// Mongoose
dotenv.config();
const { PORT, MONGO_URI } = process.env; // process.env 파일은 root폴더에 존재해야 인식가능.

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }) // mongodb URI와 option을 넣고 연결
  .then(() => console.log('connected to', MONGO_URI))
  .catch(error => console.error(error));

// Express
const app = Express();
const port = 3000; // http://localhost:3000으로 설정

// req의 bodyparser
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

// GET, PUT, POST, DELETE 모두 3가지 매개변수를 받음, 1. url 2. 미들웨어(매개변수 3개일 경우에만) 3. 콜백함수

app.get('/product/:page', async (req, res) => {
  const page = req.params.page || 1;

  try {
    const products = await Product.find()
      .limit(6)
      .skip((page - 1) * 6)
      .exec();
    console.log(products);

    const pageCount = await Product.countDocuments().exec();
    res.set('Last-Page', Math.ceil(pageCount / 6));
    res.set('Total-Products', pageCount);
    // res.set('Access-Control-Allow-Headers', 'Last-Page', 'Total-Products');

    res.status(200).send({ products, lastPage: Math.ceil(pageCount / 6) });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

app.get('/mycart', async (req, res) => {
  try {
    const carts = await Cart.find().exec();
    console.log(carts);
    res.send(carts);
  } catch (e) {
    console.log(e);
  }
});

app.post('/product/add', async (req, res) => {
  const { name, price, imageUrl } = req.body;
  console.log(req.body, 'body');
  const product = new Product({ name, price, imageUrl });
  console.log(product, 'hello');
  try {
    await product.save();
    // res.body = product;
    res.send(product);
    console.log(res.body);
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

app.post('/mycart/add/:id', async (req, res) => {
  const id = req.params.id;
  const { number_of_product, name, price, imageUrl } = req.body;
  try {
    const oldCart = await Cart.findOne({ product_id: id }).exec();
    if (oldCart) {
      const cart = await Cart.findOneAndUpdate({ product_id: id }, { number_of_product }, { new: true }).exec();
      res.send(cart);
    } else {
      const cart = new Cart({ product_id: id, number_of_product, name, price, imageUrl });
      await cart.save();
      res.send(cart);
    }
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

app.delete('/mycart/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await Cart.findOneAndDelete({ product_id: id }).exec();
    const cart = await Cart.find().exec();
    res.send(cart);
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

app.put('/mycart/edit/:id', async (req, res) => {
  const { id } = req.params; // 물건 id
  const { number_of_product } = req.body; // 물건 수량
  console.log(id);

  try {
    const cart = await Cart.findOneAndUpdate({ product_id: id }, { number_of_product }, { new: true }).exec();
    console.log(cart);
    if (!cart) {
      res.status(404).send('id you sent was not found');
    } else {
      const cart = await Cart.find().exec();
      res.send(cart);
    }
  } catch (e) {
    res.status(404).send({ error: e });
  }
});

app.listen(port, () => console.log('listening on port', port));
