// controllers/paymentController.js

import stripe from 'stripe';

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

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
