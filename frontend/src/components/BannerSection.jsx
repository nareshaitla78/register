import React, { useState } from "react";
import background from "../assets/MOSIP_Horizontal_Black.png";
import {VscGlobe} from "react-icons/vsc";
const Banner = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Language options
  const languages = ["English", "Spanish", "French", "German"];

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md h-16 flex items-center justify-between px-6 z-10">
      {/* MOSIP Logo on the left */}
      <div className="flex items-center">
        <img
          src={background}
          alt="MOSIP Logo"
          className="h-10" // Adjust height as needed
        />
      </div>

      {/* Language Dropdown on the right */}
      <div
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)} // Open dropdown on hover
        onMouseLeave={() => setIsDropdownOpen(false)} // Close dropdown on hover out
      >
        <button className="flex items-center text-blue-700 hover:text-blue-600 focus:outline-none">
        <VscGlobe
            data-testid="Language-Selector-Icon font-semibold"
            size={28} color={'var(--iw-color-languageGlobeIcon)'}/>
          <span className="ml-2 text-black-600 font-semibold" style={{color:'black'}}>{languages[0]}</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="blue"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            {languages.map((language, index) => (
              <div
                key={index}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {language}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;