import React from 'react';

const FoodDetailing = () => {
  const sections = [
    {
      id: 1,
      title: "Aunties' Kitchen Wisdom",
      description:
        "Authentic family recipes passed down through generations, cooked with patience and pride. Our home chefs prepare each meal with the same care they would for their own families.",
      image: "./food.jpeg",
      reverse: false,
    },
    {
      id: 2,
      title: "More Than a Meal - It's a Hug on a Plate",
      description:
        "Every dish carries the warmth and care of our home chefs' hands. Taste the difference that love and tradition make in every bite of our home-style cooking.",
      image: "./food1.jpeg",
      reverse: true,
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-serif font-bold text-[#F17228] mb-4 flex justify-center items-center gap-2 flex-wrap">
          Taste the Love in Every Bite
          <img
            className="w-8 sm:w-10 h-8 sm:h-10 object-contain"
            src="./meal.png"
            alt="Meal Icon"
          />
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Home-cooked meals prepared with mother's love, just like your family kitchen
        </p>
      </div>

      {/* Content Sections */}
      <div className="bg-[#FFF1D5] rounded-3xl p-4 sm:p-6 lg:p-12 max-w-6xl mx-auto">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`flex flex-col ${
              section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } items-center gap-8 mb-16 last:mb-0`}
          >
            <div className="w-full lg:w-1/2 px-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F17228] mb-4">
                {section.title}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {section.description}
              </p>
            </div>

            <div className="w-full lg:w-1/2 px-4">
              <img
                src={section.image}
                alt={section.title}
                className="rounded-xl shadow-lg w-full h-auto max-h-[400px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDetailing;
