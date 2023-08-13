import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import errorImage from "../assets/file.png";
import NoImage from "../assets/No IMAGE.png";

const PropertiesDetail = () => {
  const [searchParams] = useSearchParams();
  const decodeUrl = decodeURIComponent(searchParams.get("url"));
  const decodeImage = decodeURIComponent(searchParams.get("image"));
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError("");
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}detail`, {
        method: "post",
        body: JSON.stringify({
          url: `${import.meta.env.VITE_REQUEST_URL}${decodeUrl}`,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Unable to Fetch Data");
      }
      const totalData = await response.json();
      console.log(totalData);
      setDetail(totalData.data[0]);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, [decodeUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center text-xl my-40 font-semibold text-red-500">
          <img className="w-20 my-4" src={errorImage} alt="error" />
          {isError}
        </div>
      )}
      {!isError && !isLoading && (
        <div className="my-8">
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-center gap-4">
              <div className="w-full">
                <div className="flex items-center justify-center mt-2">
                  <img
                    className="w-full"
                    src={decodeImage != "undefined" ? decodeImage : NoImage}
                    alt="product-img"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  {detail.description}
                </h1>
                <h1 className="text-base text-[#7D879C] mb-4">
                  {detail.subDescription}
                </h1>
                <div className="flex items-center mb-4 text-md">
                  <span className="text-[#7D879C]">Listed Date:</span>
                  <h6 className="ml-2 font-semibold">{detail.date}</h6>
                </div>
                <div className="flex items-center mb-4 text-md">
                  <span className="text-[#7D879C]">Seller:</span>
                  <h6 className="ml-2 font-semibold">{detail.realEstate}</h6>
                </div>
                <div className="flex items-center mb-4 text-md">
                  <span className="text-[#7D879C]">contact:</span>
                  <h6 className="ml-2 font-semibold">{detail.number}</h6>
                </div>

                <div className="mb-6 text-sm">
                  <h2 className="text-2xl font-bold text-[#8062D6] mb-1">
                    {detail.price}
                  </h2>
                  <h5 className="my-4">{detail.basicData}</h5>
                  <h5 className="my-4">{detail.equips}</h5>
                </div>

                <div className="mb-4 text-sm">
                  <span className="text-[#7D879C]">Detail:</span>
                  <h6 className="text-xs">{detail.detail}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertiesDetail;
