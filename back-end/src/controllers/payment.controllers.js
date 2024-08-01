// controllers/paymentController.js
import dotenv from 'dotenv';
import stripePackage from 'stripe';

// Load environment variables from .env file
dotenv.config();

// Initialize Stripe with your secret key
const stripeInstance = stripePackage(process.env.STRIPE_SECRET_KEY);

const handlePayment = async (amount, token) => {
  try {
    const charge = await stripeInstance.charges.create({
      amount: amount,
      currency: 'usd',
      source: token.id,
      description: 'Example charge',
    });

    return { message: 'Payment successful', charge };
  } catch (err) {
    console.error('Error:', err);
    throw new Error('Payment failed');
  }
};

export { handlePayment };
