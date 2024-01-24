import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigator("/home");
    }
  }, []);

  const handleLogin = () => {
    axios
      .post("https://rfl-server.vercel.app/api/login/", {
        name: username,
        password,
      })
      .then((res) => {
        console.log(res);
        let { token, error } = res.data;
        if (token) {
          localStorage.setItem("token", token);
          navigator("/home");
        }
        if (error) {
          setError(error);
        }
      });
  };

  return (
    <>
      <div className="form-container bg-secondary">
        <form>
          <label className="text-white">
            Name:
            <input
              className="rounded-3 shadow border-0"
              type="text"
              name="name"
              placeholder="Enter Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label className="text-white">
            Password:
            <input
              className="rounded-3 shadow border-0"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <span className="text-white">
            Dont have a account ?{" "}
            <a className="ms-2" href="/register">
              Register
            </a>{" "}
          </span>
          <br />
          <br />
          <button type="button" onClick={handleLogin}>
            LogIn
          </button>
          <br />
          <br />
          {error && <p className="text-darnger">{error}</p>}
        </form>
      </div>
    </>
  );
}

export default Login;
