import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [myData, setMyData] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({
    _id: "",
    name: "",
    email: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [count]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/").then((res) => {
      setMyData(res.data);
    });
  }, [count]);

  const handleUpdate = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      setUpdateFormData(response.data);
      setShowModal(true);
    } catch (error) {
      console.error(`Fetch user data failed for ID ${userId}:`, error);
    }
  };

  const handleInputChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${updateFormData._id}`,
        updateFormData
      );
      setCount(count + 1);
      console.log(`Update successful for user with ID: ${updateFormData._id}`);
      setShowModal(false);
      // Add logic to update the state or show a success message.
    } catch (error) {
      console.error(
        `Update failed for user with ID ${updateFormData._id}:`,
        error
      );
      // Handle error, e.g., show an error message to the user.
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${userId}`
      );
      setCount(count + 1);
      console.log(`Delete successful for user with ID: ${userId}`);
      // Add logic to update the state or show a success message.
    } catch (error) {
      console.error(`Delete failed for user with ID ${userId}:`, error);
      // Handle error, e.g., show an error message to the user.
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    setCount(count + 1);
  };

  return (
    <>
      <div
        className="form-container justify-content-start p-2"
        style={{ flexDirection: "column" }}
      >
        <div className="row float-end">
          <button className="btn btn-danger" onClick={handleLogOut}>
            LogOut
          </button>
        </div>
        <h1>Registration Page</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myData &&
              myData.length > 0 &&
              myData.map((user) => {
                const { _id, name, email, createdAt, updatedAt } = user;
                return (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{createdAt}</td>
                    <td>{updatedAt}</td>
                    <td>
                      <button onClick={() => handleUpdate(_id)}>Update</button>
                      <button onClick={() => handleDelete(_id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}

            {myData && myData.length === 0 && (
              <tr>
                <td colSpan={6}>No Data Found....</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Update Modal */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={updateFormData.name}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={updateFormData.email}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              {/* Add other input fields for additional attributes */}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateSubmit}>
              Update User
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default HomePage;
