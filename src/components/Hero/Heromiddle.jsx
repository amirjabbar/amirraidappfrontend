// Heromiddle.js
import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
// Import the CustomModal component
import bell from "../../assets/bell.png";
import CustomModal from "../Hero/MOdal/CustomModal";
import calender from "../../assets/calendar.png";
import engineering from "../../assets/engineering.png";
import statistics from "../../assets/statistics.png";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#1c1e33",
    color: "white",
    fontSize: "0.90rem",
    border: "1px solid #4c5066",
    borderRadius: "8px",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#1c1e33",
  },
});

const Heromiddle = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-row lg:flex-col bg-[#252a40] gap-4 p-4 lg:py-[50px] lg:px-[10px] rounded-[40px] border border-new w-fit lg:max-w-[500px] ">
      <CustomTooltip title="Notification" arrow placement="top">
        <img className="w-[40px] h-[40px]" src={bell} alt="bell" />
      </CustomTooltip>
      <CustomTooltip title="Calendar" arrow placement="top">
        <img className="w-[40px] h-[40px]" src={calender} alt="calendar" />
      </CustomTooltip>
      <CustomTooltip title="Ai models" arrow placement="top">
        <img
          className="w-[40px] h-[40px] cursor-pointer"
          src={engineering}
          alt="engineering"
          onClick={handleClickOpen}
        />
      </CustomTooltip>
      <CustomTooltip title="Statistics" arrow placement="top">
        <img className="w-[40px] h-[40px]" src={statistics} alt="statistics" />
      </CustomTooltip>

      <CustomModal open={open} onClose={handleClose} />
    </div>
  );
};

export default Heromiddle;
