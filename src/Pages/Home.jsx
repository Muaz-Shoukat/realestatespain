import { useCallback, useEffect, useState } from "react";
import Categories from "../components/Categories";
import Button from "../components/Button";
import Cities from "../components/Cities";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import ErrorImage from "../assets/file.png";
import Title from "../components/UI/Title";
import Data from "../assets/Data";
import Refresh from "../components/UI/Refresh";

const Home = () => {
  const [chooseWebsite, setChooseWebsite] = useState(Data[0]);
  const [type, setType] = useState(Data[0].type[0]);
  const [response, setResponse] = useState([]);
  const [category, setCategory] = useState(Data[0].type[0].categories[0]);
  const [subCategory, setSubCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const url = import.meta.env.VITE_URL;

  const fetchData = useCallback(
    async (flag = "edium", provUrl = import.meta.env.VITE_REQUEST_URL) => {
      setLoading(true);
      setError(null);
      try {
        let response = null;
        if (flag === "subregion") {
          response = await fetch(`${url}icities`, {
            method: "post",
            body: JSON.stringify({
              url: `${import.meta.env.VITE_IDEALISTA_URL}${provUrl}`,
            }),
            headers: { "Content-Type": "application/json" },
          });
        } else {
          response = await fetch(url, {
            method: "post",
            body: JSON.stringify({ flag, url: provUrl }),
            headers: { "Content-Type": "application/json" },
          });
        }

        if (!response.ok) {
          throw new Error("Unable to Fetch Data");
        }
        const data = await response.json();
        console.log("data", data);
        if (data.flag && data.flag !== "edium") {
          navigate(`/properties?url=${encodeURIComponent(provUrl)}`);
        }

        setResponse(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    },
    [navigate, url]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chooseSiteHandler = (webObj) => {
    setChooseWebsite(webObj);
    setType(webObj.type[0]);
    setCategory(webObj.type[0].categories[0]);
    console.log("ww", webObj);
    if (webObj.name === "Pisos") {
      fetchData("edium");
    } else {
      setResponse(webObj.type[0].categories[0]);
    }
  };

  const typeHandler = (newType) => {
    console.log("categories", newType);
    setType(() => newType);
    if (chooseWebsite.name === "Pisos") {
      fetchData("edium", newType.url);
    } else {
      setResponse(newType.categories[0]);
    }
  };
  const categoryHandler = (cat) => {
    setCategory(cat);
    resetSubCategoryHandler();
    if (chooseWebsite.name === "Pisos") {
      fetchData("edium", cat.url);
    } else {
      setResponse(cat);
    }
    // fetchData("edium", cat.url);
  };
  const subCategoryHandler = (cat) => {
    setSubCategory(cat);
    if (chooseWebsite.name === "Pisos") {
      fetchData("edium", cat.url);
    } else {
      setResponse(cat);
    }
  };
  const resetCategoryHandler = useCallback(() => {
    setCategory((type.categories && type.categories[0]) || null);
    resetSubCategoryHandler();
  }, [type]);
  const resetSubCategoryHandler = () => {
    setSubCategory(null);
  };
  useEffect(() => {
    resetCategoryHandler();
  }, [resetCategoryHandler]);

  return (
    <div className="flex flex-col items-center">
      <Title title="Choose Website" />
      <div className="flex flex-wrap justify-center items-center gap-x-7 gap-y-3 sm:gap-7 mb-5 md:mb-10 min-w-[80px] max-w-[500px]">
        {Data.map((x) => {
          return (
            <Button
              typeObj={x}
              typeHandler={chooseSiteHandler}
              type={chooseWebsite}
              key={x.id}
            />
          );
        })}
      </div>

      {chooseWebsite.type && type && (
        <>
          <Title title="Property Type" />
          <div className="flex flex-wrap justify-center items-center gap-x-7 gap-y-3 sm:gap-7 mb-5 md:mb-10 min-w-[80px] max-w-[500px]">
            {chooseWebsite.type.map((x) => {
              return (
                <Button
                  typeObj={x}
                  typeHandler={typeHandler}
                  type={type}
                  key={x.id}
                />
              );
            })}
          </div>
        </>
      )}

      {type && (
        <Categories
          title="Categories"
          showCategories={type.categories}
          setCategory={categoryHandler}
          category={category}
        />
      )}
      {type && type.categories && category && (
        <Categories
          title="Sub Categories"
          showCategories={category.subCategories}
          setCategory={subCategoryHandler}
          category={subCategory}
        />
      )}
      <Title title="Provinces, Cities or Towns" />
      <div className="w-full flex items-center justify-center">
        {error && !loading && (
          <div className="flex flex-col items-center justify-center text-xl my-40 font-semibold text-red-500">
            <img className="w-20 my-4" src={ErrorImage} alt="error" />
            {error}
          </div>
        )}

        {loading && <Loader />}
        {!loading &&
          !error &&
          ((response.data && response.data.length > 0 && (
            <Cities
              website={chooseWebsite.name}
              provinces={response}
              fetchProvinceData={fetchData}
            />
          )) || <Refresh onClickHandler={fetchData} />)}
      </div>
    </div>
  );
};

export default Home;
