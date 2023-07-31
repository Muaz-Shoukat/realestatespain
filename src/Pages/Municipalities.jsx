import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Municipalities = () => {
  const [municipalities, setMunicipalities] = useState([]);
  // const params = useParams();
  // console.log(params);
  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  // const fetchData = useCallback(async () => {
  //   try {
  //     const response = await fetch("../municipalitiesWithProvinces.json");
  //     if (!response.ok) {
  //       return;
  //     }
  //     const data = await response.json();
  //     console.log(data);

  //     await setMunicipalities(() =>
  //       data.filter((mun) => mun.provCode === params.province)
  //     );
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // },[params.province]);
  return (
    <div>
     IN Progress
    </div>
  );
};

export default Municipalities;
