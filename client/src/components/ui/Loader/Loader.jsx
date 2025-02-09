import React from "react";
import { CirclesWithBar } from "react-loader-spinner";

//Implementar el Circles With Bar
const Loader = () => {
  return (
    <CirclesWithBar
      height="100"
      width="100"
      color="#ee7b00d7"
      outerCircleColor="#F6A64F"
      innerCircleColor="#F6A64F"
      barColor="black"
      ariaLabel="circles-with-bar-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
