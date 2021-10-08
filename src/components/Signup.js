import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
  
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      })
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid registration");
    } else {
      window.alert("Registration successfull");
    }
    history.push("/login");
  };
  return (
    <>
      <h1 className="text-center pt-3">Signup Page</h1>
      <div className="d-flex align-item-center justify-content-center">
        <form className="w-50 bg-secondary p-3 text-white" method="POST">
          <div className="form-group pt-3">
            <label>Name:</label>
            <input
              name="name"
              type="text"
              className="form-control  w-100"
              id="name"
              value={user.name}
              onChange={handleInputs}
            />
          </div>
          <div className="form-group pt-3">
            <label>Email address:</label>
            <input
              name="email"
              type="email"
              className="form-control  w-100"
              id="email"
              value={user.email}
              onChange={handleInputs}
            />
          </div>
          <div className="form-group pt-3">
            <label>Phone:</label>
            <input
              name="phone"
              type="number"
              className="form-control  w-100"
              id="phone"
              value={user.phone}
              onChange={handleInputs}
            />
          </div>
          <div className="form-group pt-3">
            <label>Work:</label>
            <input
              name="work"
              type="text"
              className="form-control  w-100"
              id="work"
              value={user.work}
              onChange={handleInputs}
            />
          </div>
          <div className="form-group pt-3">
            <label>Password:</label>
            <input
              name="password"
              type="password"
              className="form-control  w-100"
              id="pwd"
              value={user.password}
              onChange={handleInputs}
            />
          </div>
          <div className="form-group pt-3">
            <label>Confirm Password:</label>
            <input
              name="cpassword"
              type="password"
              className="form-control  w-100"
              id="cpwd"
              value={user.cpassword}
              onChange={handleInputs}
            />
          </div>
          <div className="form-group pt-3 d-flex justify-content-center">
            <button
              name=""
              type="submit"
              className="btn btn-success w-50"
              onClick={postData}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
