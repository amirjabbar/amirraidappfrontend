import React from "react";
import Herofirstright from "./Herofirstright";
import Herosecondright from "./Herosecondright";
import Herothirdright from "./Herothirdright";
import Heroleft from "./Heroleft";
import Heromiddle from "./Heromiddle";

const Hero = () => {
  return (
    <div className="text-[#fff] bg-[#1c1e33] flex w-full gap-10 justify-center  flex-col lg:flex-row">
      <div className="flex w-full lg:max-w-[35%] order-2 lg:order-1 p-10 lg:p-0 lg:pt-10">
        <Heroleft />
      </div>
      <div
        className="flex items-center mt-5 md:-10 lg:mt-0
        justify-center order-1 lg:order-2 p-0 "
      >
        <Heromiddle />
      </div>
      <div className="flex flex-col w-full lg:max-w-[50%] order-3 p-10 lg:p-0 lg:pt-10">
        <div>
          <Herofirstright />
        </div>
        <div>
          <Herosecondright />
        </div>
        <div>
          <Herothirdright />
        </div>
      </div>
    </div>
  );
};

export default Hero;
