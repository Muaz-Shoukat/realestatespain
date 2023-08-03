import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Properties from "./Pages/Properties";

function App() {
  return (
    <div className="max-w-[1200px] px-4 md:px-0 py-6 mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
      </Routes>
    </div>
  );
}

export default App;
