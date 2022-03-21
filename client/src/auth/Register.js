import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { register } from "../actions/auth";
import { toast } from "react-toastify";

const Register = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    name: "Emmanuel",
    email: "fegomson@gmail.com",
    password: "Test12345",
  });

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await register(credentials);
      console.log(res); // res.data
      toast.success("Registered successfully, please login", {
        theme: "colored",
      });
      history.push("/login");
    } catch (err) {
      if (err.response.status === 400)
        toast.error(err.response.data, { theme: "colored" });
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1 className="text-white">Register</h1>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <RegisterForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              credentials={credentials}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
