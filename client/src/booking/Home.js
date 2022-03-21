import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { auth } = useSelector(state => ({ ...state }));
  return <div className="container-fluid p-5 h1 text-center">Homepage</div>;
};

export default Home;
