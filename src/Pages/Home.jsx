import { useCallback, useEffect, useState } from "react";
import Categories from "../components/Categories";
import Button from "../components/Button";
import Cities from "../components/Cities";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
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
  const [bCheck, setbCheck] = useState("edium");
  const [bProvinceHref, setbProvinceHref] = useState(
    import.meta.env.VITE_REQUEST_URL
  );
  const navigate = useNavigate();

  const url = import.meta.env.VITE_URL;

  const parameterHandler = (check, provinceHref) => {
    setbCheck(check);
    setbProvinceHref(provinceHref);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log(bCheck, bProvinceHref);
    try {
      let newResponse = null;
      if (bCheck === "subregion") {
        newResponse = await fetch(`${url}icities`, {
          method: "post",
          body: JSON.stringify({
            url: `${import.meta.env.VITE_IDEALISTA_URL}${bProvinceHref}`,
          }),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        newResponse = await fetch(url, {
          method: "post",
          body: JSON.stringify({ bCheck, url: bProvinceHref }),
          headers: { "Content-Type": "application/json" },
        });
      }

      if (!newResponse.ok) {
        throw new Error("Unable to Fetch Data");
      }
      const data = await newResponse.json();
      console.log("data", data);
      if (data.flag && data.flag !== "edium") {
        navigate(`/properties?url=${encodeURIComponent(bProvinceHref)}`);
      }

      setResponse(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [navigate, url, bCheck, bProvinceHref]);

  useEffect(() => {
    console.log("Here in First useeffect");
    fetchData();
  }, [fetchData]);

  const chooseSiteHandler = (webObj) => {
    setResponse([]);
    setError(null);
    setChooseWebsite(webObj);
    setType(webObj.type[0]);
    setCategory(webObj.type[0].categories[0]);
    console.log("ww", webObj);
    if (webObj.name === "Pisos") {
      parameterHandler("edium", import.meta.env.VITE_REQUEST_URL);
    } else {
      setResponse(webObj.type[0].categories[0]);
    }
  };

  const typeHandler = (newType) => {
    
    setError(null);
    setType(() => newType);
    if (chooseWebsite.name === "Pisos") {
      parameterHandler("edium", newType.url);
    } else {
      setResponse(newType.categories[0]);
    }
  };
  const categoryHandler = (cat) => {
    setError(null);
    setCategory(cat);
    resetSubCategoryHandler();
    if (chooseWebsite.name === "Pisos") {
      parameterHandler("edium", cat.url);
    } else {
      setResponse(cat);
    }
    // parameterHandler("edium", cat.url);
  };
  const subCategoryHandler = (cat) => {
    setError(null);
    setSubCategory(cat);
    if (chooseWebsite.name === "Pisos") {
      parameterHandler("edium", cat.url);
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
    console.log("Here in second useeffect");
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

      {error && !loading && (
        <div className="flex flex-col items-center justify-center text-base md:text-xl font-semibold text-red-500">
          <div className="my-2">{error}</div>
          <Refresh onClickHandler={fetchData} />
        </div>
      )}

      {loading && <Loader />}
      {!loading && !error && response.data && response.data.length > 0 && (
        <Cities
          website={chooseWebsite.name}
          provinces={response}
          parameterHandler={parameterHandler}
        />
      )}

      {response.data && response.data.length === 0 && !error && (
        <Refresh onClickHandler={fetchData} />
      )}
    </div>
  );
};

export default Home;
