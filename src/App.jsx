import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Properties from "./Pages/Properties";

function App() {
  return (
    <div className="max-w-[1200px] mx-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
      </Routes>
    </div>
  );
}

export default App;
