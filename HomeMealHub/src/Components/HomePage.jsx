import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { MdOutlineFoodBank } from "react-icons/md";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("delivery");

  return (
    <div className="bg-[#FFB30E]">
      <nav className="flex justify-between items-center md:px-36 p-5 bg-white sticky top-0 z-50">
        <h1 className="flex items-center space-x-2 text-2xl font-bold tracking-wide text-[#F17228]"><MdOutlineFoodBank /> <span>HOMEMEAL HUB</span></h1>
        <div className="hidden md:flex gap-6">
          <a href="#home" className="text-gray-800 hover:text-[#F17228]">Home</a>
          <a href="#meals" className="text-gray-800 hover:text-[#F17228]">Meals</a>
          <a href="#about" className="text-gray-800 hover:text-[#F17228]">About</a>
          <a href="#contact" className="text-gray-800 hover:text-[#F17228]">Contact</a>
        </div>
        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden flex flex-col bg-white shadow-md p-4 absolute w-full top-16 z-50">
          <a href="#home" className="py-2" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#meals" className="py-2" onClick={() => setMenuOpen(false)}>Meals</a>
          <a href="#about" className="py-2" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" className="py-2" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}

      <section id="home" className="relative text-white flex flex-col-reverse md:flex-row items-center justify-center p-6 md:p-16 bg-cover bg-center w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center w-full gap-8">
          <div className="order-1 md:order-2 w-full md:w-1/2 flex justify-center relative">
            <img src="./meal1.jpeg" alt="Delicious Meal" className="w-full h-full max-w-xs md:max-w-sm lg:max-w-md rounded-2xl object-contain" />
            <div className="absolute bottom-0 bg-white bg-opacity-90 p-4 rounded-b-2xl w-full text-center">
              <p className="text-black text-sm md:text-base">
                We take care of your health. Customers' health is our first responsibility, and to maintain that, we have nutritionists with whom you can connect. They provide the best meals according to your health.
              </p>
            </div>
          </div>

          <div className="order-2 md:order-1 w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <h1 className="text-2xl lg:text-5xl font-bold lg:font-extrabold">Craving a Homemade Meal?</h1>
            <p className="text-sm  lg:mt-3 text-gray-700">Find Fresh, Delicious Food Near You in Just a Few Clicks!</p>
            <div className="bg-white p-6 mt-5 rounded-lg shadow-lg">
              <div className="flex gap-2 mb-4">
                <button
                  className={`px-4 cursor-pointer py-2 rounded ${selectedOption === "delivery" ? "bg-[#FFBE98] text-black" : "bg-gray-200 text-black"}`}
                  onClick={() => setSelectedOption("delivery")}
                >
                  Delivery
                </button>
                <button
                  className={`px-4 cursor-pointer py-2 rounded ${selectedOption === "pickup" ? "bg-[#FFBE98] text-black" : "bg-gray-200 text-black"}`}
                  onClick={() => setSelectedOption("pickup")}
                >
                  Pickup
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full text-black p-3 border border-gray-300 rounded-lg mb-4"
              />
              <button className="w-full cursor-pointer bg-[#F17228] text-white px-6 py-3 rounded-lg text-lg">
                Find Meals
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
