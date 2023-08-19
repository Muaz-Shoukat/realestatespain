import { useNavigate } from "react-router-dom";
import Title from "./UI/Title";
const Cities = ({ provinces, fetchProvinceData, website }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Title title="Provinces, Cities or Towns" />
      <div className=" columns-1 md:columns-2 lg:columns-4 md:gap-10 mx-3 md:mx-6 justify-start items-start">
        {provinces.data &&
          provinces.data.map((province, index) => {
            const check =
              website === "Pisos"
                ? province.classname.slice(-5)
                : province.classname
                ? province.classname
                : "default";
            return (
              <div
                key={index}
                onClick={() => {
                  if (province.href) {
                    if (
                      check === "icon-elbow --indent" ||
                      check === "region-name" ||
                      check === "default"
                    ) {
                      navigate(
                        `/properties?url=${encodeURIComponent(
                          province.href
                        )}&flag=${province.classname}`
                      );
                    } else {
                      province.href && fetchProvinceData(check, province.href);
                    }
                  }
                }}
              >
                {((check === "-item" || province.classname === "subregion") && (
                  <div
                    key={province.href}
                    className="text-[#8062D6] w-[200px] mb-2 text-left"
                  >
                    <h1
                      // to={`/properties?flag=${check}&url=${province.href}`}
                      className="cursor-pointer"
                    >
                      {province.name}
                    </h1>
                  </div>
                )) ||
                  ((check === "bitem" ||
                    province.classname === "icon-elbow --indent") && (
                    <div
                      key={province.href}
                      className="text-[#322653] w-[200px] mb-2 text-left"
                    >
                      <h1
                        // to={`/properties?flag=${check}&url=${province.href}`}
                        className="ml-4 cursor-pointer text-[#9288F8]  relative"
                      >
                        <span className="before:h-[8px] before:w-[8px] before:absolute before:bottom-[7px] before:border-b before:border-l before:border-[#9288F8] before:top-1 before:left-[-14px] before:content-['']">
                          {province.name}
                        </span>
                      </h1>
                    </div>
                  )) ||
                  ((check === "edium" ||
                    province.classname === "region-name") && (
                    <div
                      key={province.href}
                      className="text-[#974EC3] w-[200px] mb-2 text-left"
                    >
                      <h1 className="cursor-pointer font-semibold">
                        {province.name}
                      </h1>
                    </div>
                  )) || (
                    <div
                      key={index}
                      className="text-black w-[200px] mb-2 text-left"
                    >
                      <h1 className="cursor-pointer font-medium">
                        {province.name}
                      </h1>
                    </div>
                  )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Cities;
