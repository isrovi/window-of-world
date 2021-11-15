import React, { useContext, useState } from "react";
import { Form, Modal, Button, FloatingLabel } from "react-bootstrap";
import styles from "./ModalSignUp.module.css";
import { UserContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";
import { API } from "../../config/api";

export default function ModalSignUp(props) {
  let history = useHistory();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const { email, password, fullName } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      if (response?.status == 200) {
        dispatch({
          type: "SIGNUP_SUCCESS",
          payload: response.data.data,
        });

        if (response.data.data.role === "admin") {
          history.push("/transaction");
        } else {
          history.push("/home");
        }
      }
    } catch (error) {
      const alert = "Failed";
      setMessage(alert);
      console.log(error);
    }
  };

  const { setModalRegister, setModalLogin } = props;

  const modalChange = (e) => {
    setModalRegister(false);
    setModalLogin(true);
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={styles.modalContainer}
    >
      <h1 style={{ fontWeight: "900", fontSize: "36px" }} className="mx-4 mt-5">
        Sign Up
      </h1>
      <Modal.Body className="show-grid p-4 d-grid gap-2">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="flat" className={styles.btnSignup}>
            Sign Up
          </Button>
        </Form>
        <p className="text-center mt-4">
          Already have an account ? Click{" "}
          <span onClick={modalChange} style={{ cursor: "pointer" }}>
            <strong>Here</strong>
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
}
