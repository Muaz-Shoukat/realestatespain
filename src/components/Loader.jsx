import React from "react";
import ReactDOM from "react-dom";
import { Circles } from "react-loader-spinner";

const BackDrop = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30" />
  );
};

const Loader = () => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop />, document.getElementById("overlays"))}
      {ReactDOM.createPortal(
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
          <Circles
            height="80"
            width="80"
            color="#FF00FF"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default Loader;
