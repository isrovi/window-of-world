import { useContext, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ModalSignUp from "../components/modal/ModalSignUp";
import ModalSignIn from "../components/modal/ModalSignIn";

import logo from "../assets/images/icon.png";

import { useHistory } from "react-router-dom";

import { UserContext } from "../context/userContext";

function Landing() {
  const [modalRegister, setModalRegister] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);

  let history = useHistory();

  const [state] = useContext(UserContext);

  const checkAuth = () => {
    if (state.isLogin === true) {
      if (state.user.role === "admin"){
        history.push("/transaction")
      }else{
        history.push("/home")
      }
    };
  };
  checkAuth();

  return (
    <>
      <Container fluid className="bg">
        <Row>
          <Col md={1}></Col>
          <Col className="mt-2" md={5}>
            <img src={logo} alt="" />
            <p style={{ fontWeight: "400", fontSize: "24px" }}>
              Sign-up now and subscribe to enjoy all the cool and latest books -
              The best book rental service provider in Indonesia
            </p>
            <Button
              style={{ fontWeight: "800", fontSize: "18px", boxShadow: "none" }}
              variant="danger"
              className="btn-signup me-4"
              onClick={() => setModalRegister(true)}
            >
              Sign Up
            </Button>
            <Button
              style={{ fontWeight: "800", fontSize: "18px", boxShadow: "none" }}
              variant="flat"
              className="btn-signin"
              onClick={() => setModalLogin(true)}
            >
              Sign In
            </Button>
            <ModalSignUp
              show={modalRegister}
              setModalRegister={setModalRegister}
              setModalLogin={setModalLogin}
              onHide={() => setModalRegister(false)}
            />
            <ModalSignIn
              show={modalLogin}
              setModalRegister={setModalRegister}
              setModalLogin={setModalLogin}
              onHide={() => setModalLogin(false)}
            />
          </Col>
          <Col md={6}></Col>
        </Row>
      </Container>
    </>
  );
}

export default Landing;
