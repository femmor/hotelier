import React from "react";
import { useSelector } from "react-redux";

const NewHotel = () => {
  const { auth } = useSelector(state => ({ ...state }));

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1 className="text-white">Create Hotel</h1>
      </div>
      <div className="container-fluid p-4">
        <h2>Add a new hotel</h2>
      </div>
    </>
  );
};

export default NewHotel;
