import React from "react";
import { useState, useEffect } from "react";
import Ciculardash from "../Graph/Ciculardash";

const Herosecondleft = () => {
  const [graphSize, setGraphSize] = useState(110);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setGraphSize(90);
      } else if (window.innerWidth < 1000) {
        setGraphSize(100);
      } else if (window.innerWidth < 1440) {
        setGraphSize(110);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex p-[20px] bg-[#252a40] gap-4 mb-[10px] rounded-[20px] border-2 border-new px-[40px] flex-col 2xl:flex-row">
      <div className="flex flex-col w-full 2xl:max-w-[40%]">
        <p className="font-sans text-2xl">BaseLine</p>
        <p>
          sentiment analysis (also known as opinion mining) is a technique used
          to determine the emotional tone behind a body of text
        </p>
      </div>

      <div
        className="flex flex-col text-center md:flex-row gap-4 md:gap-2"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div
          className="flex flex-col"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Ciculardash
            percentage={98}
            size={graphSize}
            strokeWidth={8}
            dashLength={6}
            gapLength={4}
            gradientId="gradient"
            duration={1}
          />
          <p>Historical Rogue Data</p>
        </div>
        <div
          className="flex flex-col"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Ciculardash
            percentage={80}
            size={graphSize}
            strokeWidth={8}
            dashLength={6}
            gapLength={4}
            gradientId="gradient"
            duration={1}
          />
          <p>Accuracy and precision in Rogue detection</p>
        </div>
        <div
          className="flex flex-col"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Ciculardash
            percentage={7}
            size={graphSize}
            strokeWidth={8}
            dashLength={6}
            gapLength={4}
            gradientId="gradient"
            duration={1}
          />
          <p>Average Rougue Detection volume</p>
        </div>
      </div>
    </div>
  );
};

export default Herosecondleft;
