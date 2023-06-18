import React from "react";

function ButtonProfile({
  activeButton,
  setCurrentTab,
  setActiveButton,
  title,
  number,
}) {
  console.log(number, title);
  return (
    <button
      className={`py-1 text-lg font-medium rounded lg:w-full px-10 ${
        activeButton == number ? "bg-primary text-white" : "bg-white text-black"
      }`}
      onClick={() => {
        setCurrentTab(number);
        setActiveButton(number);
      }}
    >
      {title}
    </button>
  );
}

export default ButtonProfile;
