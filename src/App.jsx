import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Properties from "./Pages/Properties";
import GoToTop from "./components/UI/GoToTop";
import PropertiesDetail from "./Pages/PropertiesDetail";
import Header from "./components/Header";

function App() {
  return (
    <>
    <Header/>
    <div className="max-w-[1200px] px-4 py-6 mx-auto mb-24">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/detail" element={<PropertiesDetail />} />
      </Routes>
      <GoToTop />
    </div>
    </>
  );
}

export default App;
