import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Location = () => {
  return (
    <div className="bg-[#1f1f1f] text-white text-center py-20">
      <h1 className="text-4xl font-bold mb-8 flex items-center justify-center gap-2">
        <FaMapMarkerAlt className="text-orange-500" />
            Find Our <span className="text-orange-500">Location</span>
      </h1>
    <iframe
      title="HomeMealHub Location"
      className="w-full h-[400px] border-none"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.547243783285!2d-74.0060150845953!3d40.71277597933168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzQuOTk5OTk5OTkgNDAuNTk5OTk5OTk!5e0!3m2!1sen!2sus!4v1614721250130!5m2!1sen!2sus"
      allowFullScreen=""
      loading="lazy"
    ></iframe>
    </div>
  );
};

export default Location;
