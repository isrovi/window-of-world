import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal, Form, Button, Alert } from "react-bootstrap";

import { API } from "../../config/api";

import Attach from "../../assets/images/attach.png";

function ModalEditProfile(props) {
  let history = useHistory();
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    gender: "",
    phone: "",
    address: "",
    image: "",
  });

  const [preview, setPreview] = useState();

  const getProfile = async (id) => {
    try {
      const response = await API.get("/profile");
      setForm({
        ...form,
        gender: response.data.data.gender,
        phone: response.data.data.phone,
        address: response.data.data.address,
        image: response.data.data.image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
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
          "Content-type": "application/json",
        },
      };

      const formData = new FormData();
      formData.set("gender", form.gender);
      formData.set("phone", form.phone);
      formData.set("address", form.address);
      formData.set("image", form.image[0], form.image[0].name);
      const response = await API.post("/profile", formData, config);
      history.push("/home");
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Modal {...props}>
        <Alert
          className="text-center justify-content-center align-items-center"
          show={show}
          variant="success"
          onClose={handleClose}
          dismissible
        >
          <p>Edit Profile Success</p>
        </Alert>
        <Form className="p-4 d-flex flex-column" onSubmit={handleSubmit}>
          <h1 className="my-4">Edit Profile</h1>
          <Form.Control
            type="text"
            name="gender"
            placeholder="Gender"
            onChange={handleChange}
          />
          <Form.Control
            className="mt-4"
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
          />
          <Form.Control
            className="mt-4"
            as="textarea"
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />

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

          <div
            className="mt-4 align-items-center"
            style={{
              border: "1px solid #BCBCBC",
              borderRadius: "5px",
              backgroundColor: "#EAEAEA",

              width: "150px",
              textAlign: "center",
            }}
          >
            <label for="upload">
              <input
                type="file"
                id="upload"
                name="image"
                hidden
                onChange={handleChange}
              />
              <span>
                Change Image
                <img
                  for="upload"
                  src={Attach}
                  style={{ fontSize: "2rem", marginLeft: "10px" }}
                />
              </span>
            </label>
          </div>
          <Button
            type="submit"
            variant="danger"
            className="mt-4"
            style={{ height: "50px" }}
          >
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
}

export default ModalEditProfile;
