import React from "react";
import Sidebar from "../Containers/Sidebar";
import Header from "../Containers/Header";
import MainContent from "../Containers/MainContent";

function Hero() {
  return (
    <div className="w-full flex justify-center items-center py-10 bg-transparent">
      {/* Wrapper with black shadow effect */}
      <div className="relative">
        {/* Black shadow box */}
        <div className="absolute top-1 left-1 w-[1101px] h-[534px] bg-black"></div>

        {/* White container */}
        <div className="relative w-[1101px] h-[534px] flex-shrink-0 bg-white border border-[#E5E7EB] flex overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Content area */}
          <div className="flex-1 flex flex-col min-h-0">
            <Header />
            <div className="flex-1 overflow-y-auto">
              <MainContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
