import React from "react";
import { useState, useEffect } from "react";
import Circulargraph from "../Graph/Circulargraph";

const Herofirstright = () => {
  const [graphSize, setGraphSize] = useState(110);
  const [strokeWidth, setstrokeWidth] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setGraphSize(90);
        setstrokeWidth(6);
        // Small screens
      } else if (window.innerWidth < 1000) {
        setGraphSize(100);
        setstrokeWidth(8);
        // Medium screens
      } else if (window.innerWidth < 1440) {
        setGraphSize(110); // Large screens
        setstrokeWidth(10);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex flex-col justify-center flex-wrap gap-4 p-5 bg-[#252a40] mb-[10px] rounded-xl border-2 border-new px-5 sm:px-10">
      <div>
        <p className="font-sans text-xl text-white">
          Overall Performance (in past 24 hours)
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex flex-col items-center gap-4">
          <Circulargraph
            percentage={40}
            size={graphSize}
            strokeWidth={8}
            gradientId="gradient1"
            duration={1}
          />
          <p>Total similarity</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Circulargraph
            percentage={70}
            size={graphSize}
            strokeWidth={8}
            gradientId="gradient1"
            duration={1}
          />
          <p>Total Sentiment</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Circulargraph
            percentage={90}
            size={graphSize}
            strokeWidth={8}
            gradientId="gradient1"
            duration={1}
          />
          <p>Total Repetition</p>
        </div>
        <div className="flex flex-col items-center  gap-4">
          <Circulargraph
            percentage={70}
            size={graphSize}
            strokeWidth={8}
            gradientId="gradient1"
            duration={1}
          />
          <p>Total Loss</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <p>Amount of Rogue Detection per rouge type</p>
      </div>
    </div>
  );
};

export default Herofirstright;
