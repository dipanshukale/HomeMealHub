import React, { useState } from "react";
import MealData from "../Pages/MealData";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState("delivery");
  const [location, setLocation] = useState("");
  const [showMealData, setShowMealData] = useState(false);

  const handleFindMeals = () => {
    if (location.trim()) {
      setShowMealData(true);
    }
  };

  if (showMealData) {
    return <MealData option={selectedOption} location={location}/>;
  }

  return (
    <div className="bg-[#FFB30E]">
      <section
        id="home"
        className="relative text-white flex flex-col-reverse md:flex-row items-center justify-center p-6 md:p-16 bg-cover bg-center w-full max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center w-full gap-8">
          <div className="order-1 md:order-2 w-full md:w-1/2 flex justify-center relative">
            <img
              src="./meal1.jpeg"
              alt="Delicious Meal"
              className="w-full h-full max-w-xs md:max-w-sm lg:max-w-md rounded-2xl object-contain"
            />
            <div className="absolute bottom-0 bg-white bg-opacity-90 p-4 rounded-b-2xl w-full text-center">
              <p className="text-black text-sm md:text-base">
                We take care of your health. Customers' health is our first responsibility, and to maintain that, we have nutritionists with whom you can connect. They provide the best meals according to your health.
              </p>
            </div>
          </div>

          <div className="order-2 md:order-1 w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <h1 className="text-2xl lg:text-5xl font-bold lg:font-extrabold">Craving a Homemade Meal?</h1>
            <p className="text-sm lg:mt-3 text-gray-700">
              Find Fresh, Delicious Food Near You in Just a Few Clicks!
            </p>

            <div className="bg-white p-6 mt-5 rounded-lg shadow-lg">
              <div className="flex gap-2 mb-4">
                <button
                  className={`px-4 cursor-pointer py-2 rounded ${
                    selectedOption === "delivery"
                      ? "bg-[#FFBE98] text-black"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setSelectedOption("delivery")}
                >
                  Delivery
                </button>
                <button
                  className={`px-4 cursor-pointer py-2 rounded ${
                    selectedOption === "pickup"
                      ? "bg-[#FFBE98] text-black"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setSelectedOption("pickup")}
                >
                  Pickup
                </button>
              </div>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location"
                className="w-full text-black p-3 border border-gray-300 rounded-lg mb-4"
              />

              <button
                onClick={handleFindMeals}
                className="w-full flex justify-center items-center gap-2 cursor-pointer bg-[#F17228] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#e16523] transition-colors"
              >
                Find Meals{" "}
                <span className="flex justify-center items-center">
                  <img
                    className="w-6 h-6 object-contain"
                    src="./finding.png"
                    alt="Search Icon"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
