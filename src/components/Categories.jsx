import React from "react";

const Categories = (props) => {
  const catBtnClasses =
    "mx-2 md:mx-4 my-[2px] md:my-2 text-sm md:text-base bg-[#FFD2D7] px-4 py-2 rounded-3xl cursor-pointer ";
  const activeCatBtnClasses =
    "mx-2 md:mx-4 my-[2px] md:my-2  text-sm md:text-base px-4 py-2 rounded-3xl bg-[#8062D6] text-white cursor-pointer";

  return (
    <div className="w-full">
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-left">{props.title}</h1>
      </div>
      <div className="flex flex-wrap mb-2 items-center md:justify-start justify-center text-center">
        {props.showCategories && props.showCategories.map((cat) => (
          <div
            onClick={props.setCategory.bind(null,cat)}
            key={cat.id}
            className={`${
             props.category && props.category.id === cat.id ? activeCatBtnClasses : catBtnClasses
            } `}
          >
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
