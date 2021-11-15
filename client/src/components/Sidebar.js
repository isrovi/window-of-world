import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

import { Nav } from "react-bootstrap";
import styles from "./Sidebar.module.css";
import Logo from "../assets/images/logo.png";
import Profil from "../assets/images/profile.png";
import User from "../assets/images/user.png";
import Bill from "../assets/images/bill.png";
import Logout from "../assets/images/logout.png";
import Subscribe from "../pages/Subscribe";

import { API } from "../config/api";

export default function Sidebar() {
  const { id } = useParams();
  const [state, dispatch] = useContext(UserContext);
  let history = useHistory();

  const [user, setUser] = useState();

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
      setProfile(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    history.push("/");
  };

  useEffect(() => {
    getUser();
    getProfile();
  }, []);

  return (
    <>
      <Nav
        className={`${
          styles.Sidebar
        } ${"d-flex flex-column mt-4 justify-content-center align-items-center"}`}
        as="ul"
      >
        <Nav.Item as="li">
          <Nav.Link as={Link} to="/home">
            <img src={Logo} alt="" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          {profile?.image == null ? (
            <img
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "100%",
                border: "4px solid black",
              }}
              src={Profil}
              alt=""
            />
          ) : (
            <img
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "100%",
                border: "4px solid black",
              }}
              src={profile.image}
              alt=""
            />
          )}
        </Nav.Item>
        <Nav.Item as="li">
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>
            {state.user.fullName}
          </span>
        </Nav.Item>
        <Nav.Item as="li">
          {user?.transaction.length <= 0 ||
          user?.transaction[0].userStatus === "Not Active" ? (
            <span className="text-danger fw-bold" style={{ fontSize: "18px" }}>
              Not Subscribe
            </span>
          ) : (
            <span className="text-success fw-bold" style={{ fontSize: "18px" }}>
              Subscribe
            </span>
          )}
        </Nav.Item>
        <div className="align-items-start justify-content-start">
          <hr />
          <Nav.Item as="li" className="mt-5">
            <Nav.Link as={NavLink} to="/profile">
              <img src={User} alt="" />
              <span
                className="ms-3"
                style={{ fontSize: "25px", color: "#929292" }}
              >
                Profile
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li" className="mt-5 mb-5">
            <Nav.Link as={Link} to="/subscribe">
              <img src={Bill} alt="" />
              <span
                className="ms-2"
                style={{ fontSize: "25px", color: "#929292" }}
              >
                Subscribe
              </span>
            </Nav.Link>
          </Nav.Item>
          <hr />
          <Nav.Item as="li" className="mt-5">
            <Nav.Link onClick={logout}>
              <img src={Logout} alt="" />
              <span
                className="ms-3"
                style={{ fontSize: "25px", color: "#929292" }}
              >
                Logout
              </span>
            </Nav.Link>
          </Nav.Item>
        </div>
      </Nav>
    </>
  );
}
