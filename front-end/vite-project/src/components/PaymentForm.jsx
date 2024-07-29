import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ products, handlePaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || isProcessing) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create a payment method with the card details
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        throw new Error(error.message);
      }

      // Handle checkout session with the created payment method
      await handleCheckoutSession(paymentMethod);
    } catch (error) {
      console.error('Error creating payment method:', error);
      setError(error.message);
      setIsProcessing(false);
    }
  };

  const handleCheckoutSession = async (paymentMethod) => {
    try {
      // Create a checkout session on the server
      const response = await fetch('http://localhost:8000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: products.map(product => ({
            name: product.name,
            price: product.price,
            imgdata: product.image,
            paymentMethod: paymentMethod.id,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      // Get the session ID from the server response
      const { id } = await response.json();
      // Redirect to the Stripe checkout page
      const { error } = await stripe.redirectToCheckout({
        sessionId: id,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Handle successful payment
      handlePaymentSuccess();
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="cardElement" className="block text-gray-700 text-sm font-bold mb-2">
          Card Details
        </label>
        <CardElement id="cardElement" className="border border-gray-300 p-2 rounded" />
      </div>
      <div className="mb-6 text-center">
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isProcessing ? 'Processing...' : 'Pay'}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </form>
  );
};

export default PaymentForm;
