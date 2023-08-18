import Title from "./UI/Title";

const Categories = (props) => {
  const catBtnClasses =
    "mx-1 md:mx-4 my-[2px] md:my-2 text-sm md:text-base bg-[#FFD2D7] px-4 py-2 rounded-3xl cursor-pointer ";
  const activeCatBtnClasses =
    "mx-1 md:mx-4 my-1 md:my-2  text-sm md:text-base px-4 py-2 rounded-3xl bg-[#8062D6] text-white cursor-pointer";

  return (
    <>
    {props.showCategories &&
    <div className="w-full">
      <Title title={props.title} />
      <div className="flex flex-wrap mb-2 items-center md:justify-start justify-center text-center">
        
         { props.showCategories.map((cat) => (
            <div
              onClick={props.setCategory.bind(null, cat)}
              key={cat.id}
              className={`${
                props.category && props.category.id === cat.id
                  ? activeCatBtnClasses
                  : catBtnClasses
              } `}
            >
              {cat.name}
            </div>
          ))}
      </div>
    </div>
    }
    </>
  );
};

export default Categories;
