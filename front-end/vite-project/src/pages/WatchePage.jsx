import React from 'react';
import WatchCard from '../components/Watchcard'; // Import your WatchCard component
import watchesData from '../components/data.json'; // Import your watches data

const WatchesPage = ({ watchesData }) => {
  return (
    <div className="container mx-auto mt-8">
      {/* Header Section */}
      <header className="text-center mb-8 relative">
  <video
    className=" w-full h-full object-cover rounded-lg"
    autoPlay
    loop
    muted
  >
    <source src="https://content.rolex.com/v7/dam/collection/hub/2023/videos/cover/rolex-watches-collection-hub-cover-autoplay.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  
  <div className="absolute inset-0 flex flex-col justify-center items-center text-black">
    <h1 className="text-6xl font-bold">Discover Premium Watches</h1>
    <p className="text-black-600">Explore our collection of high-quality timepieces.</p>
  </div>
</header>

      {/* Featured Product Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Watch</h2>
        {/* Add your featured watch component here */}
        {/* For example: <FeaturedWatch watchData={featuredWatchData} /> */}
      </section>

      {/* Watches List Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {watchesData.map((watchData) => (
          <WatchCard key={watchData.id} watchData={watchData} />
        ))}
      </section>
    </div>
  );
};

export default WatchesPage;
