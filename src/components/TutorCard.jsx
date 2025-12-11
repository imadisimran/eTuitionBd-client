import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router
import { FaUniversity, FaStar } from 'react-icons/fa';

const TutorCard = ({ tutor }) => {
  // Safe destructuring with defaults
  const { _id, displayName, photoURL, tutorProfile } = tutor || {};
  const { institution, experience, qualification } = tutorProfile || {};

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 h-full">
      
      {/* --- Avatar Section --- */}
      <figure className="px-10 pt-10">
        <div className="avatar">
          <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img 
              src={photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
              alt={displayName} 
              className="object-cover"
            />
          </div>
        </div>
      </figure>

      {/* --- Content Section --- */}
      <div className="card-body items-center text-center p-6">
        
        {/* Name & Qualification */}
        <h2 className="card-title text-2xl font-bold text-gray-800">{displayName}</h2>
        <div className="badge badge-secondary badge-outline mt-1 px-3 py-3">
            {qualification || "Tutor"}
        </div>

        {/* Institution (with Icon) */}
        <p className="mt-4 flex items-center justify-center gap-2 text-gray-600 font-medium">
          <FaUniversity className="text-primary" /> 
          <span className="truncate max-w-[200px]">{institution || "N/A"}</span>
        </p>

        {/* Experience Stat */}
        <div className="mt-2 text-sm text-gray-500">
          <span className="font-bold text-accent text-lg">{experience}+</span> Years Experience
        </div>

        {/* --- Footer Action --- */}
        <div className="card-actions mt-6 w-full">
          <Link to={`/tutor/${_id}`} className="btn btn-primary btn-block rounded-full text-white">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;