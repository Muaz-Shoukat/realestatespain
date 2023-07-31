import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cities = ({ provinces, fetchProvinceData }) => {
  return (
    <div className="w-full">
      <div className="w-full  mb-4">
        <h1 className="text-lg md:text-2xl font-bold text-left">
          Provinces, Cities or Towns
        </h1>
      </div>
      <div className="columns-1 md:columns-2 lg:columns-4 gap-10 mx-6 justify-start items-start">
        {provinces.map((province) => {
          const check = province.classname.slice(-5);
          {
            /* const name = province.name.replace("Pisos en ",""); */
          }
          return (
            <div
              key={province.href}
              onClick={() => fetchProvinceData(check, province.href)}
            >
              {(check === "edium" && (
                <div
                  key={province.href}
                  className="text-[#322653] w-[200px] mb-2 text-left"
                >
                  <h1 className="cursor-pointer font-semibold">
                    {province.name}
                  </h1>
                </div>
              )) ||
                (check === "-item" && (
                  <div
                    key={province.href}
                    className="text-[#8062D6] w-[200px] mb-2 text-left"
                  >
                    <Link to="/province" className="cursor-pointer">
                      {province.name}
                    </Link>
                  </div>
                )) ||
                (check === "bitem" && (
                  <div
                    key={province.href}
                    className="text-[#322653] w-[200px] mb-2 text-left"
                  >
                    <Link
                      to="/province"
                      className="ml-4 cursor-pointer text-[#9288F8]  relative"
                    >
                      <span className="before:h-[8px] before:w-[8px] before:absolute before:bottom-[7px] before:border-b before:border-l before:border-[#9288F8] before:left-[-14px] before:content-['']">
                        {province.name}
                      </span>
                    </Link>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cities;
