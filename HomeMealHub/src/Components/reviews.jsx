import React, { useState, useEffect } from "react";

const reviews = [
  {
    name: "User1",
    comment: "The meals are delicious and always fresh. Delivery is fast and reliable!",
  },
  {
    name: "User2",
    comment: "Love the variety! It's like eating home-cooked food every day.",
  },
  {
    name: "User3",
    comment: "Amazing service and great value for money. Highly recommend!",
  },
];

const ReviewSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-100 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Happy <span className="text-orange-500">Customers</span>
        </h2>
      </div>

      <div className="overflow-hidden max-w-xl mx-auto relative h-[200px]">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="min-w-full px-6 text-center"
            >
              <p className="text-gray-700 italic mb-4">“{review.comment}”</p>
              <h4 className="text-orange-500 font-semibold">{review.name}</h4>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {reviews.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                current === index ? "bg-orange-500" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider;
