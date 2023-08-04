import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Properties from "./Pages/Properties";
import GoToTop from "./components/UI/GoToTop";

function App() {
  return (
    <div className="max-w-[1200px] px-4 py-6 mx-auto mb-24">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
      </Routes>
      <GoToTop/>
    </div>
  );
}

export default App;
