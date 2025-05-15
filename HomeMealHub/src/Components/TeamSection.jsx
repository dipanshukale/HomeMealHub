import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

import TeamMember1 from "../Images/member1.jpg";
import TeamMember2 from "../Images/member2.jpg";
import TeamMember3 from "../Images/member3.jpg";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Member1",
      role: "Chef",
      image: TeamMember1,
    },
    {
      name: "Member2",
      role: "chef",
      image: TeamMember2,
    },
    {
      name: "Member3",
      role: "chef",
      image: TeamMember3,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="text-center p-6 lg:p-0">
        <h2 className="text-3xl font-bold">
          Our <span className="text-orange-500">Team</span>
        </h2>
        <p className="text-gray-600 mt-2">
        Our skilled chefs and food experts ensure every meal is fresh, healthy, and full of flavor,
        </p>
        <p className="text-gray-600 mt-2">
        with a passion for quality and taste, our team crafts delicious dishes with care and expertise
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center rounded-lg p-4 shadow-2xl cursor-pointer transition-transform hover:scale-105 duration-300">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-80 object-cover rounded-lg"
            />
            <h3 className="text-lg font-bold mt-4">{member.name}</h3>
            <p className="text-gray-500">{member.role}</p>

            {/* Social Icons */}
            <div className="flex justify-center mt-3 space-x-3 ">
              <a href="#" className="text-orange-500 text-lg shadow-2xl cursor-pointer transition-transform hover:scale-105 duration-300">
                <FaFacebookF />
              </a>
              <a href="#" className="text-orange-500 text-lg shadow-2xl cursor-pointer transition-transform hover:scale-105 duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="text-orange-500 text-lg shadow-2xl cursor-pointer transition-transform hover:scale-105 duration-300">
                <FaInstagram />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
