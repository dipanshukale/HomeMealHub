import React, {useEffect} from "react";
import FoodImage from "../Images/Food1.jpg";
import TeamSection from "./TeamSection";
import Footer from "./Footer";
import ReviewSection from "./reviews";



const AboutUs = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <div className="bg-[#F17228] text-white text-center py-16">
      <h3 className="text-white uppercase tracking-wide">Fresh, Affordable & Delivered With Love</h3>

        <h1 className="text-4xl font-bold mt-2">About Us</h1>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 p-6 lg:p-0">
          <h2 className="text-3xl font-bold text-gray-800">
            Why <span className="text-orange-500">HomeMealHub?</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <span className="text-orange-500 text-2xl">🚚</span>
              <p><strong>Home Delivery:</strong> Enjoy fast delivery of fresh meals right at your doorstep.</p>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-orange-500 text-2xl">💰</span>
              <p><strong>Best Price:</strong> Get high-quality meals at the most affordable prices.</p>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-orange-500 text-2xl">📦</span>
              <p><strong>Custom Box:</strong> Choose and customize your meal box as per your preference.</p>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-orange-500 text-2xl">💳</span>
              <p><strong>Quick Refund:</strong> Hassle-free refund policy to ensure your satisfaction.</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <img
            src={FoodImage}
            alt="Fresh Food"
            className="w-[400px] h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
     <TeamSection/>
     <ReviewSection/>
    </section>
  );
};

export default AboutUs;
