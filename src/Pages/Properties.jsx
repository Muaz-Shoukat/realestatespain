import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Card from "../components/UI/Card";
import Title from "../components/UI/Title";
import Loader from "../components/Loader";
import errorImage from "../assets/file.png";
import NextArrow from "../assets/next.png";
import BackArrow from "../assets/back.png";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const decodeData = decodeURIComponent(searchParams.get("url"));
  const name = decodeData.split("-")[1];
  const [pageNumber, setPageNumber] = useState(1);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [pgNav, setPgNav] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await fetch(
        "https://realestate-server-cyan.vercel.app/props",
        {
          method: "post",
          body: JSON.stringify({
            url: `${decodeData}fecharecientedesde-desc/${pageNumber}`,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Unable to Fetch Data");
      }
      const totalData = await response.json();
      console.log(totalData);
      setProperties(totalData.data);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, [decodeData, pageNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const page = (pg, index) => {
    return (
      <div
        key={index}
        className={
          index + 1 === pageNumber
            ? "cursor-pointer rounded-md sm:rounded-lg px-2 sm:px-3 py-[2px] sm:py-1 text-xs sm:text-base  border border-[#BF40BF] text-white bg-[#BF40BF] mr-1 sm:mr-2"
            : "cursor-pointer rounded-md sm:rounded-lg px-2 sm:px-3 py-[2px] sm:py-1  text-xs sm:text-base border border-[#BF40BF] mr-1 sm:mr-2 hover:bg-[#BF40BF] hover:text-white"
        }
        onClick={() => setPageNumber(pg)}
      >
        {pg}
      </div>
    );
  };

  const pageBreak = (index) => {
    return (
      <div key={index} className="text-[#BF40BF] mr-1 sm:mr-2">
        ...
      </div>
    );
  };

  const pageNavHandler = () => {
    if (pgNav.length <= 7) {
      return pgNav.map((pg, index) => page(pg, index));
    }

    return pgNav.map((pg, index) => {
      if (index === 0 || index === pgNav.length - 1) {
        return page(pg, index);
      }
      if (pageNumber >= pgNav.length - 1) {
        if (index === pgNav.length - 6) {
          return pageBreak(index);
        }
        if (index > pgNav.length - 5) {
          return page(pg, index);
        }
      }
      if (pageNumber <= 2) {
        if (index === 5) {
          return pageBreak(index);
        }
        if (index < 4) {
          return page(pg, index);
        }
      }

      if (pageNumber > 2 && pageNumber < pgNav.length - 1) {
        if (index >= pageNumber - 3 && index <= pageNumber + 1) {
          return page(pg, index);
        }
        if (index === pageNumber + 2 && pageNumber + 2 < pgNav.length - 1) {
          return pageBreak(index);
        }
        if (index === pageNumber - 4 && pageNumber - 2 > 1) {
          return pageBreak(index);
        }
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Title title={`Properties listed in ${name.replace("/", "")}`} />
        <div className="flex w-[100px] italic font-semibold text-sm mb-4">
          ({`Page ${pageNumber}`})
        </div>
      </div>
      <div className="mb-8 mt-2 h-[2px] bg-[#8062D6]" />
      {isLoading && <Loader />}
      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center text-xl my-40 font-semibold text-red-500">
          <img className="w-20 my-4" src={errorImage} alt="error" />
          {isError}
        </div>
      )}
      {!isLoading && !isError && (
        <>
          {(properties && properties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((pro, index) => (
                <Card key={index} property={pro} />
              ))}
            </div>
          )) || (
            <div className="text-xl font-semibold text-[#8062D6] w-full h-[70vh] flex items-center justify-center align-middle">
              <span className="mx-auto">
                {pageNumber > 1
                  ? "You have reached the end of Result"
                  : "No Data Found"}
              </span>
            </div>
          )}
        </>
      )}
      <div className="flex flex-wrap justify-end items-center float-right mb-8">
        <button
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber((prev) => prev - 1);
            }
          }}
          disabled={pageNumber <= 1}
          className="mr-1 sm:mr-2 cursor-pointer w-8 p-1 sm:p-2 border-[2px] border-black sm:w-12 lg:hover:bg-[#BF40BF] rounded-full active:bg-[#BF40BF] disabled:cursor-not-allowed disabled:hidden"
        >
          <img className="w-8" src={BackArrow} alt="next" />
        </button>
        {pgNav.length > 0 && pageNavHandler()}
        <button
          disabled={!properties.length}
          onClick={() => {
            if (properties.length) {
              if (pageNumber > pgNav.length) {
                setPgNav((prev) => [...prev, pgNav.length + 1]);
                setPageNumber(() => pgNav.length + 2);
              } else {
                setPageNumber(() => pgNav.length + 1);
              }
            }
          }}
          className="cursor-pointer w-8 p-1 sm:p-2 border-[2px] border-black sm:w-12 lg:hover:bg-[#BF40BF] rounded-full active:bg-[#BF40BF] disabled:cursor-not-allowed disabled:hidden"
        >
          <img className="" src={NextArrow} alt="next" />
        </button>
      </div>
    </div>
  );
};

export default Properties;
