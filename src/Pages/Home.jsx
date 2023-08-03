import React, { useCallback, useEffect, useState } from "react";
import Categories from "../components/Categories";
import Button from "../components/Button";
import Cities from "../components/Cities";
import { types } from "../assets/CategoriesData";
import Loader from "../components/Loader";

const Home = () => {
  const [type, setType] = useState(types[0]);
  const [provinces, setProvinces] = useState([]);
  const [category, setCategory] = useState(
    type.categories && type.categories[0]
  );
  const [subCategory, setSubCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();
  const url = "https://realestate-server-cyan.vercel.app/";

  const fetchProvinceData = useCallback(
    async (flag = "edium", provUrl = "https://www.pisos.com/") => {
      setLoading(true);
      setError(null);
      try {
        setProvinces([]);
        const response = await fetch(url, {
          method: "post",
          body: JSON.stringify({ flag: "edium", url: provUrl }),
          headers: { "Content-Type": "application/json" },
        });
        console.log(response);

        if (!response.ok) {
          throw new Error("Unable to Fetch Data");
        }
        const cityData = await response.json();
        console.log(cityData);
        setProvinces(cityData.data);
      } catch (error) {
        setError(error);
        console.log("Error", error);
      }
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    fetchProvinceData();
  }, [fetchProvinceData]);

  const typeHandler = (newType) => {
    setType(() => newType);
    fetchProvinceData("edium", newType.url);
  };
  const categoryHandler = (cat) => {
    setCategory(cat);
    fetchProvinceData("edium", cat.url);
  };
  const subCategoryHandler = (cat) => {
    setSubCategory(cat);
    fetchProvinceData("edium", cat.url);
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
      <div className="flex flex-wrap justify-center items-center gap-x-7 gap-y-3 sm:gap-7 mb-5 md:mb-10 min-w-[80px] max-w-[500px]">
        {types.map((x) => {
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

      {type.categories && (
        <Categories
          title="Categories"
          showCategories={type.categories}
          setCategory={categoryHandler}
          category={category}
        />
      )}
      {type.categories && category && (
        <Categories
          title="Sub Categories"
          showCategories={category.subCategories}
          setCategory={subCategoryHandler}
          category={subCategory}
        />
      )}
      {error && <div>{error}</div>}
      {loading && <Loader />}
      {!loading && !error && (
        <Cities provinces={provinces} fetchProvinceData={fetchProvinceData} />
      )}
    </div>
  );
};

export default Home;
