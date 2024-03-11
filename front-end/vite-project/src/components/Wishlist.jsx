import React from 'react';
import { useWishlist } from '../contexts/WishListContext'; // Import the useWishlist hook

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist(); // Access wishlist and removeFromWishlist using the useWishlist hook

  if (!wishlist) {
    return <div className="container mx-auto mt-8">Loading...</div>; // Render loading state if wishlist is null
  }

  const handleRemoveFromWishlist = (watchId) => {
    removeFromWishlist(watchId); // Call removeFromWishlist function with the watchId parameter
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((watch) => (
            <div key={watch.id} className="bg-gray-100 p-4 rounded shadow">
              <img src={watch.roller_srcset} alt={watch.img_alt} className="w-full h-48 object-cover rounded mb-4" />
              <div>
                <h2 className="text-xl font-semibold mb-2">{watch.roller_title}</h2>
                <p className="text-gray-700">{watch.roller_about}</p>
                <p className="text-gray-900 font-bold mt-2">${watch.watch_price}</p>
                <button
                  onClick={() => handleRemoveFromWishlist(watch.id)} // Pass the watch id to the handleRemoveFromWishlist function
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
