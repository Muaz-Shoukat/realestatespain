import React from "react";

const Button = (props) => {
  const typeBtnClasses =
    "w-auto cursor-pointer border border-black rounded-lg py-[10px] px-4 flex justify-center items-center";
  const activetypeBtnClasses =
    "w-auto cursor-pointer border border-black rounded-lg py-3 px-4 bg-[#322653] text-white border-none";

  return (
    <button
      onClick={() => {
        props.typeHandler(props.typeObj);
      }}
      className={`${typeBtnClasses}  ${
        props.type.id === props.typeObj.id ? activetypeBtnClasses : ""
      }`}
    >
      <h1 className="text-lg font-semibold">{props.typeObj.name}</h1>
    </button>
  );
};

export default Button;
