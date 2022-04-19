import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AlgoliaPlaces from "algolia-places-react";

const NewHotel = () => {
  const { auth } = useSelector(state => ({ ...state }));
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const { title, content, location, image, price, from, to, bed } = values;

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleImageChange = e => {
    const image = e.target.files[0];
    setValues({
      ...values,
      image,
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    console.log(values);
  };

  const hotelForm = () => (
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="image">
          <input
            type="file"
            className="form-control"
            name="image"
            value={image}
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>
      </div>
    </form>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1 className="text-white">Create Hotel</h1>
      </div>
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-9">
            <br />
            {hotelForm()}
          </div>
          <div className="col-md-3">
            {image && <img src={image} alt="listing" />}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
