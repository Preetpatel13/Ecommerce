import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15', // Ensure you specify the API version you're using
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.post('/api/create-checkout-session', async (req, res) => {
  const { products } = req.body; // PaymentMethod should not be included in the request body

  console.log(req.body); // Log request body

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const lineItems = products.map((product) => ({
    price_data: {
      currency: 'inr',
      unit_amount: product.price * 100, // Convert price to cents
      product_data: {
        name: product.name,
        images: [product.image], // Changed from imgdata to image
      },
    },
    quantity: 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Change to your frontend success URL
      cancel_url: 'http://localhost:3000/cancel', // Change to your frontend cancel URL
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

import userRouter from './routes/user.routes.js'
app.use("/user",userRouter)


export { app };
