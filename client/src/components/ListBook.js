import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Serangkai from "../assets/images/serangkai.png";
import CardBook from "./card/CardBook";
import BigCard from "../assets/images/bigcard.png";

import { API } from "../config/api";

export default function ListBook() {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await API.get("/books");
      setBooks(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Container fluid>
      <Row md={4} className="d-flex justify-space-between mt-3">
        {books?.map((item, index) => (
          <CardBook item={item} index={index} />
        ))}
      </Row>
    </Container>
  );
}
