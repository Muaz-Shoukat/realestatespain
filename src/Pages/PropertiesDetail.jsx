import React, { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import errorImage from "../assets/file.png";

// const data = {
//   description: "Piso en venta en San Nicolás-La Toledana-Valle Amblés",
//   subDescription: "San Nicolás-La Toledana-Valle Amblés (Ávila Capital)",
//   price: "43.000 €",
//   tag: "\r\n            Entrega inmediata\r\n        ",
//   number: "920142026",
//   detail:
//     "\r\n            TECNOCASA Inmobiliaria, Estudio Desarrollo Ávila - Vende en exclusiva vivienda en Plaza Juan Jorge.Piso de 80 m2 para entrar a vivir, distribuido de forma independiente: pasillo, Salón, Cocina Amueblada, Dos Dormitorio y Cuarto de Baño Completo.Entres sus calidades encontrará suelos de Tarima en el Salón y habitaciónes y en zonas húmedas como Baños y Cocina grees y Alicatados de buena calidad.Respecto a la climatización dispone de calefacción individual, carpintería exterior aluminio gris.Situado junto a zonas de ocio y comercios, ambulatorio, colegio, institutos, supermercados… bien comunicado y cercano a la estación de tren y a todos los servicios necesarios para una vida cómoda y apacible.En Tecnocasa facilitamos el acceso a la financiación de nuestros clientes, a través de KIRON, la empresa de intermediación financiera del grupo Tecnocasa, con convenios nacionales con las principales entidades de España. Podemos llegar a conseguir hasta el 100% del valor de compraventa. Por eso, invitamos a todas las personas a las que podría interesarles esta vivienda, a contactar con nosotros para realizar un asesoramiento financiero personalizado y concertar una visita sin ningún tipo de compromiso.En el caso de que necesite financiación disponemos de un departamento financiero que estará encantado de atenderle. '. '.\r\n        ",
//   basicData:
//     "\r\n            \r\n                    \r\n                        \r\n                            Superficie construida\r\n                       \r\n                            : 80 m² \r\n                    \r\n                    \r\n                        \r\n                            Habitaciones\r\n                       \r\n                            : 2\r\n                    \r\n                    \r\n                        \r\n                            Baños\r\n                       \r\n                            : 1\r\n                    \r\n                    \r\n                        \r\n                            Conservación\r\n                       \r\n                            : A reformar\r\n                    \r\n\r\n                    \r\n                        Referencia\r\n                        : TC262-529476\r\n                    \r\n            \r\n        ",
//   equips:
//     '\r\n        \r\n            \r\n                \r\n                    \r\n                        Clasificación: \r\n                        Disponible\r\n                    \r\n                            \r\n                                Emisiones: \r\n                                61 Kg CO2/m2 año\r\n\r\n                                \r\n                                        A\r\n                                        B\r\n                                        C\r\n                                        D\r\n                                        E\r\n                                        F\r\n                                        G\r\n                                    \r\n                                \r\n                            \r\n\r\n\r\n                \r\n\r\n\r\n\r\n            \r\n\r\n        \r\n        \r\n                Ver etiqueta energética\r\n                \r\n                    var urlImagenCertificadoEnergetico = "https://api.pisos.com/v5/epc/E/?ConsumoValor=287&amp;Emisiones=E&amp;EmisionesValor=61&amp;CertificacionEnergeticaNumeroRegistro=0&amp;apiKey=732df30bad6bb3916e9a1c2a5d46377b";\r\n                \r\n        \r\n        \r\n    ',
// };

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
      const response = await fetch(
        "https://realestate-server-cyan.vercel.app/detail",
        {
          method: "post",
          body: JSON.stringify({
            url: `https://www.pisos.com/${decodeUrl}`,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
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
                src={decodeImage}
                alt="product-img"
              />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-4">{detail.description}</h1>
                <h1 className="text-base text-[#7D879C] mb-4">
                  {detail.subDescription}
                </h1>
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
