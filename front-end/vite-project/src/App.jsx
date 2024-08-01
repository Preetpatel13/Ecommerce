import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import WatchesPage from './pages/WatchesPage';
import WatchDetails from './pages/WatchDetail.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Wishlist from './components/Wishlist';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishListContext';
import watchesData from './components/data.json';
import './globalcss.css';
import AuthPage from './pages/AuthPage';
import Register from './components/Register.jsx';
import ProfileCard from './components/Profile.jsx';
import Success from './components/Success.jsx';
import Failure from './components/Failure.jsx';

const stripePromise = loadStripe('pk_test_51PMmmVP65nEgGGzd49NOGWaW7Z6nS4J33kMrN1OMFsp2pbWyy295VX56h1dMQ9funpw83G4cnI12XZ1W7jHsDl4a00pGtEci5x');

const App = () => {
  return (
    <AuthProvider>
      <WishlistProvider>
        <Router>
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path="/*" element={<MainLayout />} />
            </Routes>
          </Elements>
        </Router>
      </WishlistProvider>
    </AuthProvider>
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />

        <Route path="/profile" element={<ProfileCard/>} />
             

        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
