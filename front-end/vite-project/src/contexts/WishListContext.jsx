import React, { createContext, useState, useContext } from 'react';

// Create the context object
export  const WishlistContext = createContext();

// Custom hook to use the WishlistContext
export const useWishlist = () => {
  return useContext(WishlistContext);
}

// Provider component for managing the wishlist state
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (watch) => {
    setWishlist([...wishlist, watch]);
  };

  const removeFromWishlist = (watchId) => {
    const updatedWishlist = wishlist.filter((watch) => watch.id !== watchId);
    setWishlist(updatedWishlist);
  }

  // Provide the wishlist state and update functions to children components
  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext; // Export the context object
