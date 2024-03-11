// App.jsx
import React from 'react';
import WatchesPage from './pages/WatchePage';
import watchesData from './components/data.json';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import WatchDetails from './pages/WatchDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Wishlist from './components/Wishlist';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishListContext';
import './globalcss.css';
import AuthPage from './pages/AuthPage';

const App = () => {
  return (
    <div className="">
      <AuthProvider>
        <WishlistProvider>
          <Router>
            <Routes>
              {/* Route for the home page */}
              <Route path="/" element={<MainLayout />} />
              <Route path='/login' element={<AuthPage />} />
            </Routes>
          </Router>
        </WishlistProvider>
      </AuthProvider>
    </div>
  );
};

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<WatchesPage watchesData={watchesData.watches_data} />} />
        <Route path="/watch/:id" element={<WatchDetails watchesData={watchesData.watches_data} />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
