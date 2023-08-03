import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/UI/Card";
import Title from "../components/UI/Title";
import Loader from "../components/Loader";
import errorImage from "../assets/file.png";
import NextArrow from "../assets/next.png";
import BackArrow from "../assets/back.png";

const Properties = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [pgNav, setPgNav] = useState([]);

  const [searchParams] = useSearchParams();
  let name = searchParams.get("url").split("-")[1];

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError("");
    try {
      const response = await fetch(
        "https://realestate-server-cyan.vercel.app/props",
        {
          method: "post",
          body: JSON.stringify({
            url: `${searchParams.get("url")}${pageNumber}`,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Unable to Fetch Data");
      }
      const totalData = await response.json();

      setProperties(totalData.data);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, [searchParams, pageNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const page = (pg, index) => {
    return (
      <div
        key={index}
        className={
          index + 1 === pageNumber
            ? "cursor-pointer rounded-md sm:rounded-lg px-2 sm:px-3 py-[2px] sm:py-1 text-xs sm:text-base  border text-white bg-[#BF40BF] mr-1 sm:mr-2"
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
        <Title title={`Properties listed in ${name.replace("/", " ")}`} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((pro, index) => (
            <Card key={index} property={pro} />
          ))}
        </div>
      )}
      <div className="flex flex-wrap justify-end items-center float-right mb-8">
        <button
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={pageNumber <= 1}
          className="cursor-pointer mr-1 sm:mr-2"
        >
          <img
            className="bg-white w-8 sm:w-12 hover:bg-[#BF40BF] rounded-full"
            src={BackArrow}
            alt="next"
          />
        </button>
        {pgNav.length > 0 && pageNavHandler()}
        <button
          onClick={() => {
            setPgNav((prev) => [...prev, pgNav.length + 1]);
            setPageNumber(() => pgNav.length + 2);
          }}
          className="cursor-pointer"
        >
          <img
            className="bg-white p-[1px] w-8 sm:w-12 hover:bg-[#BF40BF] rounded-full"
            src={NextArrow}
            alt="next"
          />
        </button>
      </div>
    </div>
  );
};

export default Properties;
