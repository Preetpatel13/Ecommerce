import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faShieldAlt, faUndo, faGlobe, faShippingFast, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import { WishlistContext } from '../contexts/WishListContext';
import PaymentForm from '../components/PaymentForm';

const WatchDetails = ({ watchesData }) => {
  const { id } = useParams();
  const { addToWishlist } = useContext(WishlistContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [product, setProduct] = useState(null);

  // Find the watch details based on the id from URL parameters
  const watchDetails = watchesData.find((watch) => watch.id === id);

  useEffect(() => {
      // Initialize the product object
      if (watchDetails) {
        const newProduct = {
          name: watchDetails.roller_title,
          image: watchDetails.img_srcset,
          price: watchDetails.watch_price
        };
        setProduct(newProduct);
        console.log('Product:', newProduct);  
    }
  }, [watchDetails]);

  // Handle loading or not found scenario
  if (!watchDetails) {
    return <div>Loading...</div>; // Could also handle 404 here
  }

  // Add watch to wishlist
  const handleAddToWishlist = () => {
    addToWishlist(watchDetails);
  };

  // Show checkout form
  const handleBuyNow = () => {
    setShowCheckout(true);
  };

  // Callback for successful payment
  const handlePaymentSuccess = () => {
    console.log('Payment successful!');
    // Additional logic for handling payment success
  };

  return (
    <div className="max-w-full mx-8">
      <div className="relative">
        <div className="h-1/3 mb-8">
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl font-bold text-white">
            {watchDetails.roller_title}
          </h1>
        </div>
        <video className="w-full h-full rounded-lg" autoPlay loop muted>
          <source src={watchDetails.video_srcset} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="container mx-auto mt-8 flex flex-col md:flex-row items-center bg-gray-100 rounded-lg p-4 md:p-8">
        <div className="p-1 flex justify-center">
          <div className="relative overflow-hidden">
            <img
              src={watchDetails.roller_src}
              srcSet={watchDetails.roller_srcset}
              alt={watchDetails.img_alt}
              className="w-full md:max-w-300 rounded-lg object-cover shadow-md transition-transform transform scale-100 hover:scale-110"
              style={{ maxWidth: '300px', transformOrigin: 'center center' }}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{watchDetails.roller_title}</h2>
          <p className="text-gray-600 mb-6">{watchDetails.about_text}</p>
          <div className="flex items-center mb-6">
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon="star"
                className={`h-6 w-6 ${index < watchDetails.star_rating ? 'text-yellow-500' : 'text-gray-400'}`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <p className="text-xl font-semibold text-gray-700 mr-4">Price: ${watchDetails.watch_price}</p>
              <button className="bg-gray-800 text-white px-6 py-2 rounded shadow hover:bg-gray-900 transition-colors mr-4">
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                Add to Cart
              </button>
              <button onClick={handleAddToWishlist} className="bg-gray-800 text-white px-6 py-2 rounded shadow hover:bg-gray-900 transition-colors mr-4">
                <FontAwesomeIcon icon={faHeart} className="mr-2" />
                Add to Wishlist
              </button>
              <button onClick={handleBuyNow} className="bg-gray-800 text-white px-6 py-2 rounded shadow hover:bg-gray-900 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 text-lg w-full">
            <Feature icon={faShieldAlt} text="12 Months Warranty" />
            <Feature icon={faUndo} text="Easy Return and Replacement" />
            <Feature icon={faGlobe} text="Serviced Across India" />
            <Feature icon={faShippingFast} text="Free Shipping Across India" />
            <Feature icon={faMoneyBillAlt} text="Pay on Delivery Available" />
          </div>
        </div>
      </div>
      {showCheckout && product && (
        <PaymentForm
          products={[product]}
          handlePaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

// Feature component to display product features
const Feature = ({ icon, text }) => (
  <div className="flex items-center">
    <FontAwesomeIcon icon={icon} className="text-1xl text-gray-600 mr-2" />
    <p className="text-gray-600 text-sm">{text}</p>
  </div>
);

export default WatchDetails;
