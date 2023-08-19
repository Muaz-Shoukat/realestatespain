import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/UI/Card";
import Title from "../components/UI/Title";
import Loader from "../components/Loader";
import errorImage from "../assets/file.png";
import NextArrow from "../assets/next.png";
import BackArrow from "../assets/back.png";
import IdealistaCard from "../components/UI/IdealistaCard";

// const data = [
//   {
//     id: "97822395",
//     title:
//       "\nCalle Dámaso Alonso, s/n, Sierra de Estepona-Avda de Andalucia, Estepona\n",
//     logo: "https://st3.idealista.com/d5/e2/ad/245599142607056251-260374818.gif",
//     subTitle: "Estepona Gardens",
//     price: "206.000€",
//     Description:
//       "\nDescubre Estepona Gardens, un desarrollo privado y exclusivo de viviendas pensadas para la privacidad, la tranquilidad y el confort. Gracias a sus innovadoras zonas comunes, tu casa se rodea de posibilidades para que por fin puedas vivir como siempre has imaginado.\nPISOS DE OBRA NUEVA EN ESTEPONA A\n",
//     details: "\nPisos de 2 habitaciones \n",
//     href: "/obra-nueva/97822395/",
//   },
//   {
//     id: "36675949",
//     title:
//       "\nCalle Columbretes, s/n, Palmete-Padre Pío-Hacienda San Antonio, Sevilla\n",
//     logo: "https://st3.idealista.com/78/9f/a6/aedas-homes-3.gif",
//     subTitle: "Jardines Hacienda Rosario Edificio La Danza",
//     price: "179.000€",
//     Description:
//       "\nJardines Hacienda Rosario es un gran residencial que tiene todo lo que buscas: perfectas comunicaciones con los principales núcleos de la ciudad, un exclusivo parque privado de más de 33.000 m2 con unas zonas comunes envidiables, equipadas con 6 pistas de pádel, una piscina de adultos con una lámina\n",
//     details: "\nPisos de 3 habitaciones \n",
//     href: "/obra-nueva/36675949/",
//   },
//   {
//     id: "27307042",
//     title: "\nCalle Ana Belén Sánchez, s/n, Las Pajanosas, Guillena\n",
//     logo: "https://st3.idealista.com/86/5d/6c/p00002905.gif",
//     subTitle: "Hato Verde Viviendas",
//     price: "160.000€",
//     Description:
//       "\n¿Quieres vivir en plena naturaleza a tan solo 12 minutos del centro de Sevilla? En la urbanización privada de obra nueva Hato Verde encontrarás viviendas y chalets de estilo andaluz y espacios luminosos.\n> Las viviendas son de 2 y 3 dormitorios, el salón-comedor dispone de chimenea y cuentan con 2\n",
//     details: "\nPisos y Chalets adosados de 2 y 5 habitaciones \n",
//     href: "/obra-nueva/27307042/",
//   },
//   {
//     id: "94612361",
//     title: "\nCalle Baños, 32, Plaza de la Gavidia-San Lorenzo, Sevilla\n",
//     logo: "https://st3.idealista.com/02/64/a1/249524528609018668-260398431.gif",
//     subTitle: "Edificio Cosme 32",
//     price: "189.000€",
//     Description:
//       "\nÚLTIMA DISPONIBLE\nEstudio professional disponible en venta\nVive en el CENTRO, de tu vida\nPorque sabemos que para tí, la ubicación es importante.\nVIVIENDAS CON UN CONCEPTO ÚNICO, FUNCIONALES Y DE DISEÑO PENSADAS PARA TU BIENESTAR.\nÁtico con Solarium en pleno centro de la ciudad, a un paso de todo\n",
//     details: "\nPisos de 1 habitación \n",
//     href: "/obra-nueva/94612361/",
//   },
//   {
//     id: "101740416",
//     title: "\nCalle Monte Miramar, 34, Limonar, Málaga\n",
//     logo: "https://st3.idealista.com/9b/44/5d/clarity-el-limonar.gif",
//     subTitle: "Clarity El Limonar",
//     price: "755.900€",
//     Description:
//       "\nSavills pone a su disposición esta promoción de viviendas de lujo, ubicada en una de las zonas más representativas y exclusivas de Málaga, El Limonar. Clarity Málaga es un residencial de alta gama situado en uno de los mejores barrios de la capital de la Costa del Sol, el cuál comenzó su desarrollo\n",
//     details: "\nPisos y áticos de 3 y 4 habitaciones \n",
//     href: "/obra-nueva/101740416/",
//   },
//   {
//     id: "91582487",
//     title:
//       "\nUrbanización Altos de los Monteros, s/n, Alto de los Monteros, Marbella\n",
//     logo: "https://st3.idealista.com/f5/ff/06/grupo-insur.gif",
//     subTitle: "Quintessence",
//     price: "395.000€",
//     Description:
//       "\n¡OBRAS INICIADAS!\nQuintessence ha sido diseñado como un concepto de residencial inmerso en un magnífico espacio natural con una planificación arquitectónica moderna y minimalista.\nUn innovador y elegante residencial de 96 viviendas, compuesto por apartamentos de 2 y 3 dormitorios con amplios espaci\n",
//     details: "\nPisos, áticos y dúplex de 2 y 3 habitaciones \n",
//     href: "/obra-nueva/91582487/",
//   },
//   {
//     id: "98673838",
//     title: "\nCalle troya, s/n, Aguadulce sur, Roquetas de Mar\n",
//     logo: "https://st3.idealista.com/25/9b/f1/idealista-130000647-1678140573761.gif",
//     subTitle: "Carmenes de Aguadulce RP5",
//     price: "132.800€",
//     Description:
//       "\nPromoción de obra nueva Carmenes de Aguadulce RP5.\nPisos y áticos de 2, 3 y 4 habitaciones.\n",
//     details: "\nPisos de 2, 3 y 4 habitaciones \n",
//     href: "/obra-nueva/98673838/",
//   },
//   {
//     id: "97813916",
//     title: "\nCalle Miguel Cid, 76, San Vicente, Sevilla\n",
//     logo: "https://st3.idealista.com/0b/97/3b/idealista-260406896-1655112147860.gif",
//     subTitle: "Edificio El Cid",
//     price: "289.000€",
//     Description:
//       "\n50 % VENDIDO\nGrupo housin promueve, construye y comercializa un proyecto único y exclusivo de viviendas proyectadas y diseñadas al más puro estilo housin, situado en la Calle Miguel del Cid 76, San Lorenzo (Sevilla).\nPromoción de 6 viviendas versión premium en el centro de Sevilla, un edificio\n",
//     details: "\nPisos y áticos de 1 y 2 habitaciones \n",
//     href: "/obra-nueva/97813916/",
//   },
//   {
//     id: "95384682",
//     title:
//       "\nAvenida Mariano Hernandez, s/n, El Sabinar - Urbanizaciones - Las Marinas, Roquetas de Mar\n",
//     logo: "https://st3.idealista.com/f9/05/25/grupo-21.gif",
//     subTitle: "Residencial Mariano Hernandez",
//     price: "130.000€",
//     Description:
//       "\nEsta promoción de viviendas se encuentra en un emplazamiento inmejorable, en primera línea de playa y en una zona totalmente consolidada con una gran multitud de servicios urbanos en las cercanías inmediatas. Servicios como son supermercados, farmacias, gran variedad de ofertas de ocio y un paseo ma\n",
//     details: "\nPisos de 1, 2, 3 y 4 habitaciones \n",
//     href: "/obra-nueva/95384682/",
//   },
//   {
//     id: "101474156",
//     title: "\nAvenida Europa, s/n, Pulpi\n",
//     logo: "https://st3.idealista.com/52/42/da/p04610219.gif",
//     subTitle: "Mar de Pulpí by TM",
//     price: "130.000€",
//     Description:
//       "\nApartamentos de obra nueva en primera línea de mar. Una ubicación privilegiada en la Costa de Almería.\nMar de Pulpí se encuentra a tan solo 5 minutos de San Juan de los Terreros y con una variedad de servicios dentro del residencial Mar de Pulpí (restaurantes, supermercado, centro deportivo) que t\n",
//     details: "\nPisos de 1, 2 y 3 habitaciones \n",
//     href: "/obra-nueva/101474156/",
//   },
//   {
//     id: "92895177",
//     title: "\nAvenida De Las Ciencias, 3, Avenida de las Ciencias, Sevilla\n",
//     logo: "https://st3.idealista.com/8b/89/3a/culmia.gif",
//     subTitle: " CULMIA Ciencias Park ",
//     price: "154.800€",
//     Description:
//       "\n¡Visita piso piloto!\n* Plaza y/o trastero incluidos en el precio. Precios sujetos a disponibilidad. Impuestos no incluidos. Consulta más viviendas disponibles en nuestro punto de venta\nOBRAS INICIADAS\nUn hogar para disfrutar,\nCulmia Ciencias Park está formada por 239 viviendas de 2 a 4 dormitorio\n",
//     details: "\nPisos de 2, 3 y 4 habitaciones \n",
//     href: "/obra-nueva/92895177/",
//   },
//   {
//     id: "95512174",
//     title: "\nAvenida Anda jaleo, s/n, San Jose de la Rinconada\n",
//     logo: "https://st3.idealista.com/99/2d/bd/grupoansan.gif",
//     subTitle: "Residencial Lorca",
//     price: "154.500€",
//     Description:
//       "\nGRUPO ANSAN, se complace en informarles que HAN COMENZADO LAS OBRAS de su nueva Promoción en San José de La Rinconada. RESIDENCIAL LORCA.\nTodas nuestras viviendas tienen vinculados e INCLUIDOS EN EL PRECIO UNA PLAZA DE GARAJE Y UN TRASTERO. Como calidades resaltamos armarios empotrados en dormitori\n",
//     details: "\nPisos y áticos de 2, 3 y 4 habitaciones \n",
//     href: "/obra-nueva/95512174/",
//   },
//   {
//     id: "99614437",
//     title:
//       "\nAvenida avd. de la Cruz esquina calle Juna cuadrado Ruiz, s/n, Los Ángeles - Cruz de Caravaca, Almería\n",
//     logo: "https://st3.idealista.com/f9/05/25/grupo-21.gif",
//     subTitle: "Torre Indalo",
//     price: "147.250€",
//     Description:
//       "\nGRUPO 21, es la promotora inmobiliaria que construye hogares pensando en la completa satisfacción de las personas que vivirán en ellos, por eso mismo y ante la exitosa acogida por nuestros clientes irrumpimos en Almería con una promoción innovadora en la capital para dar el máximo servicio en nuestr\n",
//     details: "\nPisos de 2, 3 y 4 habitaciones \n",
//     href: "/obra-nueva/99614437/",
//   },
//   {
//     id: "99224937",
//     title:
//       "\nCalle Juegos de Atenas y Languedor Rosellon, s/n, El Toyo, Almería\n",
//     logo: "https://st3.idealista.com/f9/05/25/grupo-21.gif",
//     subTitle: "Residencial Atenas",
//     price: "150.250€",
//     Description:
//       "\nResidencial Atenas será un motivo más de felicidad.\nEn Residencial Atenas tendrás la tranquilidad de vivir fuera de la ciudad, pero a tan solo 10 minutos del centro, en un lugar privilegiado por su seguridad, calidad de vida y bienestar.\nVivirás próximo a uno de los enclaves naturales de la zona y\n",
//     details: "\nPisos y áticos de 2 y 3 habitaciones \n",
//     href: "/obra-nueva/99224937/",
//   },
//   {
//     id: "96616644",
//     title:
//       "\nAvenida España Urb. Sitio de Calahonda, 24, Sitio de Calahonda, Mijas\n",
//     logo: "https://st3.idealista.com/3a/0c/05/251299065629189192-260403663.gif",
//     subTitle: "Oxygen",
//     price: "204.750€",
//     Description:
//       "\nOxigen es una exclusiva promoción de viviendas vacacionales ubicada en el corazón de Calahonda, rodeado de restaurantes, farmacias y todas las necesidades y a tan solo 15 minutos andando de la playa.\nEntorno dedicado a la salud, deporte y bienestar donde, a pocos pasos, puedes encontrar fitness co\n",
//     details: "\nPisos y áticos de 1 habitación \n",
//     href: "/obra-nueva/96616644/",
//   },
//   {
//     id: "101934086",
//     title: "\nCalle Aliaria, 3, Los Pacos, Fuengirola\n",
//     logo: "https://st3.idealista.com/cb/d4/4c/century21-turquesa.gif",
//     subTitle: "Garden Home",
//     price: "249.000€",
//     Description:
//       "\nGarden Home es una promoción de 16 viviendas de 2 y 3 dormitorios en la zona baja del barrio Los Pacos en Fuengirola y a tan solo 1 km de la playa de Fuengirola.\nGarden Home esta formado por 4 bloques de 4 plantas cada uno y en cada planta una vivienda con terraza con vistas al mar.\nLas viviendas\n",
//     details: "\nPisos de 2 y 3 habitaciones \n",
//     href: "/obra-nueva/101934086/",
//   },
//   {
//     id: "101965509",
//     title: "\nAvenida Comares Parcela R-9.1, s/n, Las Flores, Mijas\n",
//     logo: "https://st3.idealista.com/cb/d4/4c/century21-turquesa.gif",
//     subTitle: "Promoción Premier ",
//     price: "199.439€",
//     Description:
//       "\nExclusividad y diseño contemporáneo en pleno corazón de la Costa del Sol.\n72 viviendas en una gran edificación plurifamiliar con excelentes prestaciones.\nUn proyecto único y exclusivo en una ubicación inmejorable.\nOs damos la bienvenida a PREMIER Residencial, una gran edificación plurifamiliar qu\n",
//     details: "\nPisos y áticos de 2 y 3 habitaciones \n",
//     href: "/obra-nueva/101965509/",
//   },
//   {
//     id: "100905811",
//     title:
//       "\nCalle Urbanización Camarate Golf, s/n, Casares Golf - Casares del Sol, Casares\n",
//     logo: "https://st3.idealista.com/60/1d/c0/p29003898.gif",
//     subTitle: "Camarate Hills",
//     price: "224.000€",
//     Description:
//       "\nCamarate Hills consta de 47 viviendas plurifamiliares de 1, 2 y 3 dormitorios. Cada apartamento cuenta con garaje y trastero incluido.\nResidencial privado con piscina, zonas ajardinadas y zona infantil. En el diseño de este residencial se ha buscado integrar la construcción con su entorno, aprovech\n",
//     details: "\nPisos de 2 y 3 habitaciones \n",
//     href: "/obra-nueva/100905811/",
//   },
//   {
//     id: "97064200",
//     title: "\nCalle Madrid, 79, Zona Puerto Deportivo, Fuengirola\n",
//     logo: "https://st3.idealista.com/4c/e3/4f/251719139629220875-260404854.gif",
//     subTitle: "Jade Tower",
//     price: "499.000€",
//     Description:
//       "\nJade Tower es un exclusivo complejo de 116 apartamentos de obra nueva, ya en construcción bajo el sello internacional BREEAM® (Building Research Establishment Environmental Assessment Methodology). Ubicado en una zona prestigiosa de la Costa del Sol, Fuengirola a solo 20 minutos en coche del aeropue\n",
//     details: "\nPisos de 2 y 3 habitaciones \n",
//     href: "/obra-nueva/97064200/",
//   },
//   {
//     id: "94761656",
//     title: "\nCalle Jilguero, 24, Torreblanca del Sol, Fuengirola\n",
//     logo: "https://st3.idealista.com/e0/7e/e9/blancareal.gif",
//     subTitle: "Blanca Hills",
//     price: "556.325€",
//     Description:
//       "\n¡OPORTUNIDAD! VILLAS ECO-SOSTENIBLES EN FUENGIROLA\nBlanca Hills es un proyecto de 12 villas en Torreblanca desde 169 m2 hasta 268 m2, con 3 dormitorios y jardín privado.\n· Precio/m2 más bajo de la zona\n· Certificado energético A, con un ahorro energético de hasta un 60%\n· Entorno tranquilo y villa\n",
//     details: "\nChalets independientes de 3 habitaciones \n",
//     href: "/obra-nueva/94761656/",
//   },
//   {
//     id: "93300158",
//     title: "\nAvenida de Palmas Altas, Palmas Altas, Sevilla\n",
//     logo: "https://st3.idealista.com/2f/f5/18/metrovacesa17.gif",
//     subTitle: "Residencial Mulhacen",
//     price: "224.000€",
//     Description:
//       "\n¡En construcción!\nLa promoción esta configurada por 46 viviendas. PALMAS ALTAS-ISLA NATURA. Disfruta de una nueva forma de vivir en Sevilla. Perfectas y rápidas comunicaciones.\nSe desarrolla en dos bloques de viviendas plurifamiliares y locales comerciales, diferenciados por una zona común de tráns\n",
//     details: "\nPisos de 2 y 4 habitaciones \n",
//     href: "/obra-nueva/93300158/",
//   },
//   {
//     id: "100911388",
//     title: "\nCalle Salvador Rueda, 17, Malagueta - Monte Sancha, Málaga\n",
//     logo: "https://st3.idealista.com/5d/e4/0a/be-grand-el-limonar.gif",
//     subTitle: "Be Grand ",
//     price: "1.303.000€",
//     Description:
//       "\nBe Grand El Limonar es un proyecto único, ubicado en la exclusiva zona del Monte de Sancha, al este de la ciudad de Málaga, rodeado de lujosas villas residenciales muchas de ellas de principios del siglo XX, con maravillosas vistas a la bahía y El Limonar. A 250 metros de la playa, rodeado de todo t\n",
//     details: "\nPisos y dúplex de 2 y 3 habitaciones \n",
//     href: "/obra-nueva/100911388/",
//   },
//   {
//     id: "94256374",
//     title:
//       "\nPaseo de los Jazmines, 14, Valdeolletas-Las Cancelas-Xarblanca, Marbella\n",
//     logo: "https://st3.idealista.com/7e/92/42/246875097607201547-260379477.gif",
//     subTitle: "Jazmines 14",
//     price: "1.550.000€",
//     Description:
//       "\nENTREGA EN JUNIO 2023. VISITA NUESTRA VILLA PILOTO.\nTe esperamos en Jazmines14, un conjunto de 8 villas independientes en Marbella con un diseño innovador.\nOcho espaciosas y luminosas villas de obra nueva en parcelas individuales. Todas ellas con jardín y piscina.\nTerminadas con magníficas calida\n",
//     details: "\nChalets independientes de 4 habitaciones \n",
//     href: "/obra-nueva/94256374/",
//   },
//   {
//     id: "99897892",
//     title: "\nPaseo Rector Antonio Gallego Morell, s/n, La Chana, Granada\n",
//     logo: "https://st3.idealista.com/52/98/f5/254407028630020430-260410357.gif",
//     subTitle: "Residencial Abril",
//     price: "115.213€",
//     Description:
//       "\nRESIDENCIAL ABRIL, 153 VIVIENDAS PROTEGIDAS en ADJUDICACION DIRECTA, con piscina, en la mejor zona, desde 1 dormitorio a 4 dormitorios, tarima flotante en salón y dormitorios, todas las viviendas tienen vinculada una plaza de aparcamiento y trastero la mayoría de ellas. En paseo Rector Gallego Morel\n",
//     details: "\nPisos de 1, 2, 3 y 4 habitaciones \n",
//     href: "/obra-nueva/99897892/",
//   },
//   {
//     id: "102041909",
//     title: "\nPaseo de las Olas, s/n, Almerimar, El Ejido\n",
//     logo: "https://st3.idealista.com/05/8d/13/cubica.gif",
//     subTitle: "Residencial Horizonte",
//     price: "105.000€",
//     Description:
//       "\nPROXIMA VENTA, INSCRIBASE SIN COMPROMISO.\nEN PRIMERA LÍNEA DE PLAYA.\nRESIDENCIAL HORIZONTE la nueva promoción que estabas esperando, una combinación perfecta de 500m de espacios libres y jardines municipales. Su exclusiva ubicación a menos de 50 m de la playa de Almerimar hará de su residencia un\n",
//     details: "\nPisos de 1 y 2 habitaciones \n",
//     href: "/obra-nueva/102041909/",
//   },
//   {
//     id: "101578926",
//     title:
//       "\nAvenida del Mediterráneo, s/n, Barrio San Luis - Los Molinos, Almería\n",
//     logo: "https://st3.idealista.com/f9/05/25/grupo-21.gif",
//     subTitle: "Torremar",
//     price: "140.000€",
//     Description:
//       "\nLa comodidad y la seguridad de un entorno tranquilo y bien comunicado.\nAmplitud de espacio para una mayor libertad de movimientos y una excelente relación calidad-precio son algunos de los factores que muchos de nosotros demandamos a la hora de adquirir una vivienda para independizarte o formar tu\n",
//     details: "\nPisos y dúplex de 2, 3 y 4 habitaciones \n",
//     href: "/obra-nueva/101578926/",
//   },
//   {
//     id: "101726912",
//     title:
//       "\nCalle Estonia con Polonia, s/n, Vega de Acá - Nueva Almería - Cortijo Grande, Almería\n",
//     logo: "https://st3.idealista.com/f9/05/25/grupo-21.gif",
//     subTitle: "DULCEMAR II",
//     price: "150.000€",
//     Description:
//       "\nDULCEMAR II la nueva promoción que estabas esperando en Almería una combinación perfecta entre ciudad, espacios amplios y grandes zonas ajardinadas a un paso de la playa de Almería.\nEdificio con un espíritu puramente urbano y un diseño arquitectónico de vanguardia, respetuoso e integrado en la nu\n",
//     details: "\nPisos y dúplex de 2, 3 y 4 habitaciones \n",
//     href: "/obra-nueva/101726912/",
//   },
//   {
//     id: "101140044",
//     title:
//       "\nCalle Cabo Tres Forcas, s/n, El Rinconcillo - San José Artesano, Algeciras\n",
//     logo: "https://st3.idealista.com/46/ec/5a/jardines-de-el-rinconcillo.gif",
//     subTitle: "Jardines de el Rinconcillo",
//     price: "149.950€",
//     Description:
//       "\nChalets de 2 y 3 dormitorios en el Rinconcillo de Algeciras. A diez minutos de la playa. Desde 149.950 €\nJardines de El Rinconcillo son viviendas unifamiliares de 2ª o ulterior transmisión, con Licencia de Primera Ocupación concedida en el año 2009. Por ello el cliente pagará ITP en lugar de IVA.\n",
//     details: "\nChalets adosados de 2 y 3 habitaciones \n",
//     href: "/obra-nueva/101140044/",
//   },
//   {
//     id: "102188328",
//     title: "\nCalle casas nuevas, s/n, Urbanización Santa Rosa, Torrox\n",
//     logo: "https://st3.idealista.com/05/8d/13/cubica.gif",
//     subTitle: "RESIDENCIAL TORROX",
//     price: "140.000€",
//     Description:
//       "\nPRÓXIMA VENTA, INSCRÍBASE SIN COMPROMISO.\nRESIDENCIAL TORROX la nueva promoción que estabas esperando. Su exclusiva ubicación a menos de 1.4 Km de la playa de Cala Chica, en Torrox hará de su residencia un lugar de vacaciones.\nTorrox es una población situada en la Costa del Sol, a tan solo 42 km d\n",
//     details: "\nPisos de 2 habitaciones \n",
//     href: "/obra-nueva/102188328/",
//   },
//   {
//     id: "101849559",
//     title:
//       "\nAvenida de la Hermandad de la Oración en el Huerto, esquina con Avenida de la Hermandad de la Misericordia, s/n, El Juncal - Vallealto, El Puerto de Santa María\n",
//     logo: "https://st3.idealista.com/57/85/9c/242838176609023537-260398953.gif",
//     subTitle: "Residencial Pinea Puerto",
//     price: "163.000€",
//     Description:
//       "\nEn una zona inmejorable del Puerto de Santa María, a tan solo 5 minutos del centro de la ciudad y la playa, Grupo Rusvel les ofrece un magnífico proyecto de 72 viviendas plurifamiliares de 3 y 4 dormitorios con enormes jardines privados en planta baja, amplias terrazas en todas las viviendas y espec\n",
//     details: "\nPisos y áticos de 3 y 4 habitaciones \n",
//     href: "/obra-nueva/101849559/",
//   },
// ];

const Properties = () => {
  const [searchParams] = useSearchParams();
  const decodeData = decodeURIComponent(searchParams.get("url"));
  const flag = searchParams.get("flag");
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
      let response = null;
      if (flag) {
        response = await fetch(`${import.meta.env.VITE_URL}iprops`, {
          method: "post",
          body: JSON.stringify({
            url: `${
              import.meta.env.VITE_IDEALISTA_URL
            }${decodeData}pagina-${pageNumber}.htm`,
          }),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        response = await fetch(`${import.meta.env.VITE_URL}props`, {
          method: "post",
          body: JSON.stringify({
            url: `${decodeData}${import.meta.env.VITE_FILTER_URL}${pageNumber}`,
          }),
          headers: { "Content-Type": "application/json" },
        });
      }
      if (!response.ok) {
        throw new Error("Unable to Fetch Data");
      }
      const totalData = await response.json();

      setProperties(totalData.data);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, [decodeData, pageNumber, flag]);

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
              {flag
                ? properties.map((pro, index) => (
                    <IdealistaCard key={index} property={pro} />
                  ))
                : properties.map((pro, index) => (
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
