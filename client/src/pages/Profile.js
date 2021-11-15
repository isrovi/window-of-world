import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";

import { API } from "../config/api";

import { Button, Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Email from "../assets/images/email.png";
import Gender from "../assets/images/gender.png";
import Phone from "../assets/images/phone.png";
import Map from "../assets/images/map.png";
import Profil from "../assets/images/profile.png";
import Tess from "../assets/images/tess.png";

import ModalEditProfile from "../components/modal/ModalEditProfile";

export default function Profile() {
  let history = useHistory();
  const { id } = useParams();
  const [state] = useContext(UserContext);

  const [modalEditProfile, setModalEditProfile] = useState();

  const [user, setUser] = useState({});

  const [profile, setProfile] = useState();

  const getUser = async () => {
    try {
      const response = await API.get("/user/" + state.user.id);
      setUser(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      const res = await API.get("/profile");
      setProfile(res.data?.data);
      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const [bookList, setBookList] = useState([]);

  const getBookList = async () => {
    try {
      const response = await API.get("/book-list");
      setBookList(response.data?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getProfile();
    getBookList();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10} className="d-flex flex-column my-4 p-5">
            <h2>Profile</h2>
            <div
              className="mt-4 p-5 d-flex flex-row justify-content-between"
              style={{
                width: "95%",
                height: "60%",
                background: "#FFD9D9",
                borderRadius: "8px",
              }}
            >
              <Col md={4} className="flex-column">
                <div className="d-flex flex-row align-items-center">
                  <img src={Email} alt="" className="me-3" />
                  <span>
                    <b>{state.user?.email}</b>
                    <p>Email</p>
                  </span>
                </div>
                <div className="d-flex flex-row align-items-center mt-3">
                  <img src={Gender} alt="" className="me-3" />
                  <span>
                    <b>{user?.profile?.gender ? user?.profile?.gender : "-"}</b>
                    <p>Gender</p>
                  </span>
                </div>
                <div className="d-flex flex-row align-items-center mt-3">
                  <img src={Phone} alt="" className="me-3" />
                  <span>
                    <b>{user?.profile?.phone ? user?.profile?.phone : "-"}</b>
                    <p>Mobile Phone</p>
                  </span>
                </div>
                <div className="d-flex flex-row align-items-center mt-3">
                  <img src={Map} alt="" className="me-3" />
                  <span>
                    <b>
                      {user?.profile?.address ? user?.profile?.address : "-"}
                    </b>
                    <p>Address</p>
                  </span>
                </div>
              </Col>
              <Col md={3} className="d-flex flex-column justify-content-center">
                {profile?.image == null ? (
                  <img src={Profil} alt="" />
                ) : (
                  <img src={profile?.image} alt="" />
                )}
                <Button
                  variant="danger"
                  style={{
                    width: "100%",
                    height: "50px",
                    background: "#D60000",
                    borderRadius: "5px",
                    marginTop: "15px",
                  }}
                  onClick={() => setModalEditProfile(true)}
                >
                  Edit Profile
                </Button>
                <ModalEditProfile
                  show={modalEditProfile}
                  onHide={() => setModalEditProfile(false)}
                />
              </Col>
            </div>
            <div className="mt-5">
              <h2 className="mb-5">My List Book</h2>
              <div className="d-flex flex-row">
                {bookList?.map((item, index) => (
                  <div
                    onClick={() => {
                      history.push("/detail-book/" + item.book.id);
                    }}
                    key={index}
                    className="me-4"
                  >
                    <img
                      style={{ width: "200px", height: "270px" }}
                      src={item.book.image}
                      alt=""
                    />
                    <h5>{item.book.title}</h5>
                    <p>{item.book.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
