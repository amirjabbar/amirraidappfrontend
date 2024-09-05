import React, { useState, useEffect } from "react";

const AnalysisCard = ({ title, description, dots, onDotClick }) => (
  <div className="flex flex-col max-w-[100%] text-lwhite bg-[#252a40] rounded-[30px] gap-2 px-[25px] py-[10px] border-2 border-new">
    <p className="font-sans lg:text-2xl md:text-xl">{title}</p>
    <p className="font-sans lg:text-base md:text-xs">{description}</p>
    <div className="flex w-full gap-3">
      {dots.map((color, index) => (
        <span
          key={index}
          className={`rounded-[50%] h-[10px] w-[10px] ${color}`}
          onClick={(e) => onDotClick(title, index, color, e)}
        ></span>
      ))}
    </div>
  </div>
);

const Heroleft = () => {
  const [selectedDot, setSelectedDot] = useState(null);

  // Update the popup content dynamically and keep the popup open
  const handleDotClick = (title, index, color, event) => {
    event.stopPropagation(); // Prevent the event from bubbling up to the document
    setSelectedDot({ title, index, color }); // Update the selected dot information
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedDot && !event.target.closest(".popup-content")) {
        setSelectedDot(null);
      }
    };

    // Add the event listener for click events
    document.addEventListener("click", handleClickOutside);

    // Remove the event listener on cleanup
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedDot]);

  const closePopup = () => {
    setSelectedDot(null);
  };

  const renderPopup = () => {
    if (!selectedDot) return null;

    const { title, index, color } = selectedDot;
    const info = `Dot color: ${color} - Dot #${index + 1} in ${title}.`;

    return (
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div className="relative p-4 rounded-lg bg-white shadow-lg bg-[#252a40] border-2 border-new popup-content">
          <h3 className="text-xl font-bold">
            {title} - Dot {index + 1}
          </h3>
          <p>{info}</p>
          <button
            onClick={closePopup}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative flex flex-col gap-4"
      onClick={(e) => e.stopPropagation()}
    >
      <AnalysisCard
        title="Similarity"
        description="Similarity measures the semantic similarity between the prompt and the response (ranges [-1,1])."
        dots={[
          "bg-back",
          "bg-back",
          "bg-[#000000]",
          "bg-back",
          "bg-back",
          "bg-back",
          "bg-[#000000]",
        ]}
        onDotClick={handleDotClick}
      />
      <AnalysisCard
        title="Sentiment"
        description="Sentiment measures whether the sentiment between the prompt and the response is congruent or not (boolean)."
        dots={[
          "bg-back",
          "bg-back",
          "bg-[#000000]",
          "bg-back",
          "bg-back",
          "bg-back",
          "bg-[#000000]",
        ]}
        onDotClick={handleDotClick}
      />
      <AnalysisCard
        title="Comparison"
        description="Comparison evaluates how many of the entities detected in the prompt are also found in the response. It ranges in [0,1]."
        dots={[
          "bg-back",
          "bg-back",
          "bg-[#000000]",
          "bg-back",
          "bg-back",
          "bg-back",
          "bg-[#000000]",
        ]}
        onDotClick={handleDotClick}
      />{" "}
      <AnalysisCard
        title="Response time"
        description="Response time indicates how long inference took. It also ranges in [0,1]."
        dots={[
          "bg-back",
          "bg-back",
          "bg-[#000000]",
          "bg-back",
          "bg-back",
          "bg-back",
          "bg-[#000000]",
        ]}
        onDotClick={handleDotClick}
      />
      <AnalysisCard
        title="Response Length"
        description="Response length measures whether the response length is within the baseline distribution or not 
(boolean)."
        dots={[
          "bg-back",
          "bg-back",
          "bg-[#000000]",
          "bg-back",
          "bg-back",
          "bg-back",
          "bg-[#000000]",
        ]}
        onDotClick={handleDotClick}
      />
      <AnalysisCard
        title="Repetition"
        description="Repetition looks for repeated phrases in the response (boolean)."
        dots={[
          "bg-back",
          "bg-back",
          "bg-[#000000]",
          "bg-back",
          "bg-back",
          "bg-back",
          "bg-[#000000]",
        ]}
        onDotClick={handleDotClick}
      />
      {renderPopup()}
    </div>
  );
};

export default Heroleft;
