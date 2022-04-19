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
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/300x300?text=PREVIEW"
  );

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
    // console.log(e.target.files[0].name);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({
      ...values,
      image: e.target.files[0],
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
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />
        <input
          type="number"
          name="bed"
          onChange={handleChange}
          placeholder="Bed"
          className="form-control m-2"
          value={bed}
        />
      </div>

      <button className="btn btn-outline-primary m-2">Save</button>
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
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
