import React, { useState, useEffect} from "react";
import { ReactReader } from "react-reader";
import { useParams } from "react-router";
import { API } from "../config/api";

import BookSlide from "../assets/images/readbook.png";
import { Container, Row, Col, Nav, NavDropdown } from "react-bootstrap";
import Navbar from "../components/Navbar";

export default function ReadBook() {
  const [location, setLocation] = useState(null);
  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };

  let { id } = useParams();

  const [book, setBook] = useState();

  const getBook = async () => {
    try {
      const response = await API.get("/book/" + id);
      setBook(response.data.data.book);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <>
      <Container fluid>
          <Navbar />
        <div 
          className="p-5"
          style={{ height: "80vh", position:"relative" }}
        >
            <ReactReader
              location={location}
              locationChanged={locationChanged}
              url="http://localhost:5000/uploads/1634604917306-Tess-of-the.epub"
            />
          </div>
      </Container>
    </>
  );
}
