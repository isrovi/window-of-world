import React, { useState, useContext } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Wow from "../assets/images/wow.png";
import Upload from "../assets/images/upload.png";
import Sidebar from "../components/Sidebar";
import { Modal } from "react-bootstrap";

import { useHistory } from "react-router";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

export default function Subscribe() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let history = useHistory();

  const [form, setForm] = useState({
    accountNumber: "",
    transferProof: "",
  });

  const [preview, setPreview] = useState();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("accountNumber", form.accountNumber);
      formData.set(
        "transferProof",
        form.transferProof[0],
        form.transferProof[0].name
      );
      const response = await API.post("/transaction", formData, config);
      handleShow();
      history.push("/subscribe");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col
            md={10}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <Modal centered show={show} onHide={handleClose}>
              <p className="p-4 text-success text-center">
                Thank you for subscribing to premium, your premium package will
                be active after our admin approves your transaction, thank you
              </p>
            </Modal>
            <h1 className="fw-bold">Premium</h1>
            <p className="mt-4">
              Pay now and access all the latest books from
              <img src={Wow} alt="WOW" />
            </p>
            <p className="fw-bold mt-4">
              <img src={Wow} alt="WOW" /> : 0981312323
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 mt-4">
                <Form.Control
                  style={{
                    width: "350px",
                    height: "50px",
                    borderRadius: "5px",
                  }}
                  type="text"
                  name="accountNumber"
                  placeholder="Input your account number"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 justif-space-between">
                <Form.Label
                  style={{
                    padding: "10px",
                    border: "1px solid black",
                    width: "350px",
                    height: "50px",
                    borderRadius: "5px",
                  }}
                  for="upload"
                  className="fw-bold"
                >
                  Attache proof of transfer <img src={Upload} alt="icon" />
                </Form.Label>
                <Form.Control
                  id="upload"
                  name="transferProof"
                  type="file"
                  hidden
                  onChange={handleChange}
                />
              </Form.Group>

              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                    alt={preview}
                  />
                </div>
              )}

              <Button
                style={{ width: "350px", height: "40px" }}
                variant="danger"
                type="submit"
              >
                Send
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
