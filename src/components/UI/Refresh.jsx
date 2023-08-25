const Refresh = ({ onClickHandler }) => {
  return (
    <button onClick={()=>onClickHandler()} className=" flex justify-center items-center py-2 px-4 bg-[#8062D6] text-sm md:text-lg font-semibold text-white rounded-md z-10 cursor-pointer">
      REFRESH
    </button>
  );
};

export default Refresh;
