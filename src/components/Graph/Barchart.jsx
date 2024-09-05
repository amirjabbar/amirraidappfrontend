import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
const data = [
  { name: "Jan", uv: 30, max: 100 },
  { name: "Feb", uv: 70, max: 100 },
  { name: "Mar", uv: 50, max: 100 },
  { name: "Apr", uv: 60, max: 100 },
  { name: "May", uv: 40, max: 100 },
  { name: "Jun", uv: 10, max: 100 },
  { name: "Jul", uv: 70, max: 100 },
  { name: "Aug", uv: 30, max: 100 },
  { name: "Sep", uv: 80, max: 100 },
  { name: "Oct", uv: 50, max: 100 },
  { name: "Nov", uv: 60, max: 100 },
  { name: "Dec", uv: 40, max: 100 },
];

// Custom shape to render the bars with black background
const CustomBar = (props) => {
  const [barsize, setbarsize] = useState(110);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setbarsize(15);
        // Small screens
      } else if (window.innerWidth < 1000) {
        setbarsize(20);
        // Medium screens
      } else if (window.innerWidth < 1440) {
        setbarsize(25);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { fill, x, y, width, height } = props;
  const chartHeight = 220; // Reduced total height by 50px

  return (
    <g>
      {/* Black background bar */}
      <rect
        x={x}
        y={y - (chartHeight - height)} // Adjust the y position to span the full height
        width={width}
        height={chartHeight} // Set the height to cover 100% of the intended height
        fill="#000000"
        rx={15} // Rounded corners
        ry={15}
      />
      {/* Blue bar */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={15} // Rounded corners
        ry={15}
      />
    </g>
  );
};

// Custom tooltip component
const CustomTooltip = ({ payload, label }) => {
  if (payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "black",
          borderRadius: "5px",
          padding: "10px",
          fontSize: "14px",
        }}
      >
        <p style={{ margin: 0 }}>{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Barchart = () => {
  return (
    <ResponsiveContainer width="100%" height={230}>
      {" "}
      {/* Reduced height by 50px */}
      <BarChart
        data={data}
        // margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="none" />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Bar
          dataKey="uv"
          fill="url(#colorUv)"
          shape={<CustomBar />}
          barSize={20}
        />{" "}
        {/* Reduced bar width */}
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1569fc" stopOpacity={1} />
            <stop offset="100%" stopColor="#88fffd" stopOpacity={1} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
