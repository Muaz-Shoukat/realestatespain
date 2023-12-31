import { useCallback, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { Circles } from "react-loader-spinner";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [csvData, setCSVData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const csvDataRef = useRef(null);
  const location = useLocation();

  const headers = [
    { label: "Location", key: "Description" },
    { label: "New Price", key: "PriceNew" },
    { label: "Old Price", key: "PriceOld" },
    { label: "Reference", key: "Reference" },
    { label: "Updated On", key: "UpdatedOn" },
  ];

  const fetchDataHandler = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}csv`);

      if (!response.ok) {
        throw new Error("Unable to Fetch Data");
      }
      const data = await response.json();

      setCSVData(data.data);
      setTimeout(() => {
        csvDataRef.current.link.click();
      }, 500);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="bg-[#322653] py-4 text-white">
      <CSVLink
        data={csvData}
        headers={headers}
        filename="PropertiesData.csv"
        target="_blank"
        ref={csvDataRef}
      />
      <div className="max-w-[1200px] flex justify-between items-center mx-auto px-2">
        <Link
          to="/"
          className="text-base md:text-xl font-semibold cursor-pointer"
        >
          REAL ESTATE SPAIN
        </Link>

        {location.pathname === "/" && (
          <button
            disabled={isLoading}
            onClick={fetchDataHandler}
            className=" flex justify-center items-center py-2 px-4 bg-[#8062D6] text-sm md:text-lg font-semibold text-white rounded-md z-10 cursor-pointer"
          >
            {isLoading ? (
              <Circles
                height="24"
                width="24"
                color="#FF00FF"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : !isError ? (
              "Download CSV"
            ) : (
              "Try Again"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
