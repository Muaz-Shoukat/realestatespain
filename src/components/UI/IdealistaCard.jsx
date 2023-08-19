
import NoImage from "../../assets/No IMAGE.png";


const IdealistaCard = ({ property }) => {
  // const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer"
      // onClick={() =>
      //   navigate(
      //     `/properties/detail?url=${encodeURIComponent(
      //       property.href
      //     )}&image=${encodeURIComponent(property.image)}`
      //   )
      // }
    >
      <div className="relative overflow-hidden w-full mb-6 rounded-md text-left bg-white shadow-xl">
        <div className="relative w-full h-[200px] sm:h-[250px] overflow-hidden">
          {/* {property.tag && (
            <div className="absolute text-sm md:text-base top-3 bg-[#9288F8] text-white left-3 px-2 py-1 rounded-md">
              {property.title}
            </div>
          )} */}
          <img
            className="h-full w-full object-cover transition ease-out delay-150 duration-300 hover:scale-125"
            src={NoImage}
            alt="img"
          />
        </div>
        <div className="relative">
          <div className="absolute right-0 -top-10">
            <img src={property.logo} alt="logo" />
          </div>
        <div className="px-4 py-5">
          <div className="font-semibold text-lg md:text-lg mb-2">
            {property.title}
          </div>
          <div className="font-semibold text-[#36454F] text-lg md:text-base mb-2">
            {property.subTitle}
          </div>
          <div className="text-sm md:text-base mb-2 text-gray-500">
            {property.Description}
          </div>
          <div className="text-[#8062D6] font-bold text-base mb-2">
            {property.price}
          </div>
          <div className="text-sm mb-2 text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis ">
            {property.details}
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default IdealistaCard;
