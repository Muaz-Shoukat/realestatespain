const Refresh = ({ onClickHandler, check, province }) => {
  return (
    <button
      onClick={() => {
        if (check && province) {
          onClickHandler(check, province);
        } else {
          onClickHandler();
        }
      }}
      className=" flex justify-center items-center py-2 px-4 bg-[#8062D6] text-sm md:text-lg font-semibold text-white rounded-md cursor-pointer"
    >
      REFRESH
    </button>
  );
};

export default Refresh;
