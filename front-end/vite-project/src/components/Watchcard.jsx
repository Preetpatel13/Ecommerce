import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const WatchCard = ({ watchData }) => {
  const {
    roller_srcset,
    img_alt,
    roller_title,
    roller_about,
    watch_price,
    video_src,
    id
  } = watchData;

  const [showVideoModal, setShowVideoModal] = useState(false);
  const navigate = useNavigate();

  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  const navigateToDetails = () => {
    // Programmatically navigate to the details page
    navigate(`/watch/${id}`);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md">
      <Link to={`/watch/${id}`}>
      <img
  className="w-full h-64 object-cover object-center cursor-pointer transition-transform transform scale-100 hover:scale-110"
  src={roller_srcset}
  alt={img_alt}
  onClick={openVideoModal}
  style={{ transformOrigin: 'center center' }}
/>

      </Link> <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{roller_title}</h2>
        <p className="text-gray-600 text-sm">{roller_about}</p>
        <p className="text-gray-800 font-bold mt-2">${watch_price}</p>
      </div>

      {showVideoModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={closeVideoModal}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="mb-4">
                <button onClick={closeVideoModal} className="absolute top-0 right-0 p-2 m-2 text-gray-600 hover:text-gray-800">
                  <span className="sr-only">Close</span>
                  &#x2715;
                </button>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe src={video_src} title={roller_title} frameBorder="0" allowFullScreen className="w-full h-full"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchCard;
