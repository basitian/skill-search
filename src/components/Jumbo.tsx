import React from "react";

const Jumbo = () => {
  return (
    <>
      <h1 className="z-10 mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Discover the world’s potential...
        <br /> in{" "}
        <span className="bg-gradient-to-r from-blue-700 to-emerald-500 bg-clip-text text-transparent">
          people
        </span>
      </h1>
      <p className="mb-10 text-lg font-normal text-gray-500 dark:text-gray-200 sm:px-16 lg:px-48 lg:text-xl">
        Explore people’s amazing skills and present yours.
        <br />
        Technologies, cooking, drawing... you can do it, others demand it.
      </p>
    </>
  );
};

export default Jumbo;
