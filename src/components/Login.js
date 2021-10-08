import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      window.alert("Login successfull");
      history.push("/");
    }
  };

  return (
    <>
      <h1 className="text-center pt-3">Login Page</h1>
      <div className="d-flex align-item-center justify-content-center">
        <form method="POST" className="w-50 bg-secondary p-3 text-white">
          <div className="form-group pt-3">
            <label>Email address:</label>
            <input
              name="email"
              type="email"
              className="form-control  w-100"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group pt-3">
            <label for="pwd">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control  w-100"
              id="pwd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group pt-3 d-flex justify-content-center">
            <button
              name="login"
              type="login"
              className="btn btn-success w-50"
              onClick={loginUser}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
