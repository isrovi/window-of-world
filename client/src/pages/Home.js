import React from "react";
import Sidebar from "../components/Sidebar";
import ListBook from "../components/ListBook";
import { Container, Row, Col } from "react-bootstrap";
import { Route } from "react-router-dom";

import BigCard from "../assets/images/bigcard.png";

export default function Home() {
  
  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
        <div className="mt-4">
        <img src={BigCard} alt="" />
      </div>
      <h1>List Book</h1>
          <Route exact path="/home" component={ListBook} />
        </Col>
      </Row>
    </Container>
  );
}
