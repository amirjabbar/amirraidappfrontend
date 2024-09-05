import React from "react";
import Barchart from "../Graph/Barchart";

const Herothirdright = () => {
  return (
    <div>
      {" "}
      <div className="flex p-[20px] bg-[#252a40] gap-4 mb-[10px] rounded-[20px] border-2 border-new px-4 md:px-[40px] flex-col 2xl:flex-row">
        <div className="flex flex-col w-full 2xl:max-w-[40%] gap-2">
          <p className="font-sans text-2xl">RAIDs Performance</p>
          <p>
            Overall Effectiveness and accuracy of rouge detection of RAIDs
            system
          </p>
        </div>
        <Barchart />
      </div>
    </div>
  );
};

export default Herothirdright;
