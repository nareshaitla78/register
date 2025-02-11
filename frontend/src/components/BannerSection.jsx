import React from "react";
import background from "../assets/background.png";

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-64 flex items-center justify-between px-6"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      

      
    </div>
  );
};

export default Banner;