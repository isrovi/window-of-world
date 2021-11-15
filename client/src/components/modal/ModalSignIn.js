import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

import { Form, Modal, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "./ModalSignIn.module.css";

export default function ModalSignIn(props) {
  const { setModalRegister, setModalLogin } = props;

  const modalChange = (e) => {
    setModalRegister(true);
    setModalLogin(false);
  };

  let history = useHistory();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);

      // Checking process
      if (response?.status == 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data?.data,
        });

        // Status check
        if (response.data.data.role === "admin") {
          history.push("/transaction");
        } else {
          history.push("/home");
        }
      }
      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = "Failed";
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName={`${styles.modalContainer}`}
      >
        <h1
          style={{ fontWeight: "900", fontSize: "36px" }}
          className="mx-4 mt-5"
        >
          Sign In
        </h1>
        <Modal.Body className="show-grid p-4 d-grid gap-2">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                style={{
                  background: "#F3F3F3",
                  height: "50px",
                  border: "2px solid #BCBCBC",
                  fontWeight: "400",
                  fontSize: "18px",
                  color: "#5B5B5B",
                }}
                type="email"
                placeholder="Email Address"
                value={email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                style={{
                  background: "#F3F3F3",
                  height: "50px",
                  border: "2px solid #BCBCBC",
                }}
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="flat"
              className={styles.btnContainer}
              type="submit"
            >
              Sign In
            </Button>
            <p className="text-center align-items-center mt-4">
              Don't have an account ? Click{" "}
              <span onClick={modalChange} style={{ cursor: "pointer" }}>
                <strong>Here</strong>
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
