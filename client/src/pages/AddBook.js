import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";

import Drop from "../assets/images/drop.png";
import Attach from "../assets/images/attach.png";
import Addico from "../assets/images/add.png";

import Navbar from "../components/Navbar";

import { useHistory } from "react-router";

import { API } from "../config/api";

export default function AddBook() {
  let history = useHistory();

  const [preview, setPreview] = useState();

  const [form, setForm] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    image: "",
    bookFile: "",
  });

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
      formData.set("title", form.title);
      formData.set("publicationDate", form.publicationDate);
      formData.set("pages", form.pages);
      formData.set("author", form.author);
      formData.set("isbn", form.isbn);
      formData.set("about", form.about);
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("bookFile", form.bookFile[0], form.bookFile[0].name);
      const response = await API.post("/book", formData, config);
      history.push("/add-book");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container fluid className="px-4">
        <Navbar />
        <Form className="m-5 d-block 100vh px-5" onSubmit={handleSubmit}>
          <h1 className="mb-4">Add Book</h1>
          <Form.Control
            className="mb-4"
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />
          <Form.Control
            className="mb-4"
            type="date"
            name="publicationDate"
            placeholder="Publication Date"
            onChange={handleChange}
          />
          <Form.Control
            className="mb-4"
            type="number"
            name="pages"
            placeholder="Pages"
            onChange={handleChange}
          />
          <Form.Control
            className="mb-4"
            type="text"
            name="author"
            placeholder="Author"
            onChange={handleChange}
          />
          <Form.Control
            className="mb-4"
            type="text"
            name="isbn"
            placeholder="ISBN"
            onChange={handleChange}
          />
          <Form.Control
            className="mb-4"
            as="textarea"
            name="about"
            placeholder="About This Book"
            onChange={handleChange}
            style={{ height: "200px" }}
          />

          {/* Upload Image */}
          <div
            className="text-center"
            style={{
              border: "1px solid #BCBCBC",
              width: "170px",
              borderRadius: "5px",
              backgroundColor: "#EAEAEA",
              padding: "6px",
            }}
          >
            <label for="image">
              <input
                type="file"
                id="image"
                name="image"
                hidden
                onChange={handleChange}
              />
              <span>
                Attach Cover Book
                <img for="image" src={Attach} style={{ fontSize: "2rem" }} />
              </span>
            </label>
          </div>
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

          {/* Upload Book File */}
          <div
            className="text-center mt-4"
            style={{
              border: "1px solid #BCBCBC",
              width: "160px",
              borderRadius: "5px",
              backgroundColor: "#EAEAEA",
              padding: "6px",
            }}
          >
            <label htmlFor="bookFile">
              <input
                type="file"
                id="bookFile"
                name="bookFile"
                hidden
                onChange={handleChange}
              />
              <span>
                Attach Book File
                <img for="bookFile" src={Attach} style={{ fontSize: "2rem" }} />
              </span>
            </label>
          </div>
          <div className="d-flex flex-column justify-content-end align-items-end">
            <Button type="submit" variant="danger">
              Add Book <img src={Addico} alt="" />
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
