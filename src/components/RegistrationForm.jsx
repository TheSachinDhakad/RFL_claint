import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://rfl-server.vercel.app/api/register/",
        formData
      );
      let { token, error } = response.data;
      if (token) {
        navigate("/");
      }

      if (error) {
        setError(error);
      }

      console.log("Registration successful:", response.data);
      // Handle success, e.g., redirect to a new page or show a success message.
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container bg-secondary">
      <form onSubmit={handleRegistration}>
        <label className="text-white">
          Name:
          <input
            type="text"
            name="name"
            className="rounded-3 shadow border-0"
            placeholder="Enter Your Username"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className="text-white">
          Email:
          <input
            className="rounded-3 shadow border-0"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
          />
        </label>
        <br />
        <label className="text-white">
          Password:
          <input
            placeholder="Enter password"
            className="rounded-3 shadow border-0"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <span className="text-white">
          Alredy have a account ? <a href="/">LogIn</a>{" "}
        </span>
        <br />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default RegistrationForm;
