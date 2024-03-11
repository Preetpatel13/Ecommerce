import React, { useContext } from 'react'; // Import useContext from React
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart,faHeart, faShieldAlt, faUndo, faGlobe, faShippingFast, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import watchesData from '../components/data.json';
import {WishlistContext} from '../contexts/WishListContext'
const WatchDetails = ({ watchesData }) => {
  const { id } = useParams(); // Use the parameter defined in the route
  const { addToWishlist } = useContext(WishlistContext); // Access addToWishlist function from WishlistContext

  // Find the watch details based on the id
  const watchDetails = watchesData.find((watch) => watch.id === id);

  if (!watchDetails) {
    return <div>Loading...</div>;
  }

  const handleAddToWishlist = () => {
    addToWishlist(watchDetails); // Call addToWishlist function with the watchDetails object
  };

  return (
    <div className="max-w-full mx-8">
      {/* Render the video within a div */}
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
      {/* Render the image after the video */}
      <div className="container mx-auto mt-8 flex flex-row items-center bg-gray-100 rounded-lg p-4 md:p-8">
  {/* Image */}
  <div className=" p-1 flex justify-center">
    <div className="relative overflow-hidden">
      <img
        src={watchDetails.roller_srcset}
        alt={watchDetails.img_alt}
        className="w-full md:max-w-300 rounded-lg object-cover shadow-md transition-transform transform scale-100 hover:scale-110"
        style={{ maxWidth: '300px', transformOrigin: 'center center' }}
      />
    </div>
  </div>

  {/* Details */}
  <div className="w-full md:w-1/2 px-4">
  {/* Title */}
  <h2 className="text-3xl font-bold text-gray-800 mb-4">{watchDetails.roller_title}</h2>
  
  {/* Lorem ipsum text */}
  <p className="text-gray-600 mb-6">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
    Sed nisi.
  </p>

  {/* Star rating */}
  <div className="flex items-center mb-6">
    {[...Array(5)].map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={['far', 'star']}
        className={`h-6 w-6 text-yellow-500 ${index < watchDetails.star_rating ? 'text-yellow-500' : 'text-gray-400'}`}
      />
    ))}
  </div>

  {/* Price and Add to Cart */}
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center">
      <p className="text-xl font-semibold text-gray-700 mr-4">Price: ${watchDetails.watch_price}</p>
      <button className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition-colors">
        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
        Add to Cart
      </button>
    <button onClick={handleAddToWishlist} className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition-colors">
      <FontAwesomeIcon icon={faHeart} className="mr-2" />
      Add to Wishlist
    </button>
      </div>
  </div>

  {/* Additional Features */}
  <div className="grid grid-cols-2 gap-6 text-lg w-full">
    <Feature icon={faShieldAlt} text="12 Months Warranty" />
    <Feature icon={faUndo} text="Easy Return and Replacement" />
    <Feature icon={faGlobe} text="Serviced Across India" />
    <Feature icon={faShippingFast} text="Free Shipping Across India" />
    <Feature icon={faMoneyBillAlt} text="Pay on Delivery Available" />
  </div>
</div>

</div>

      </div>  );
};

// Feature Component
const Feature = ({ icon, text }) => (
  <div className="flex items-center whitespace-norap w-full">
    <FontAwesomeIcon icon={icon} className="text-1xl text-gray-600 mr-2" />
    <p className="text-gray-600 text-sm whitespace-nowrap">{text}</p>
  </div>
);

export default WatchDetails;
