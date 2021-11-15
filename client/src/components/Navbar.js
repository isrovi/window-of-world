import React, { useContext } from "react";
import { Nav, NavDropdown } from "react-bootstrap";

import Wow from "../assets/images/bitwow.png";
import User from "../assets/images/usernav.png";
import Add from "../assets/images/addbook.png";
import Logout from "../assets/images/redlogout.png";

import { Link, NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Navbar() {
  const [state, dispatch] = useContext(UserContext);

  let history = useHistory();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    history.push("/");
  };

  const addBook = () => {
    history.push("/add-book");
  };

  return (
    <>
      <Nav sticky="top" className="d-flex justify-content-between my-4">
        <Nav.Item>
          <Link to="/home">
            <img src={Wow} alt="" />
          </Link>
        </Nav.Item>
        <NavDropdown title={<img src={User} alt="" />} id="nav-dropdown">
          <NavDropdown.Item onClick={addBook}>
            <img
              className="me-2"
              style={{ fontSize: "24px" }}
              src={Add}
              alt=""
            />
            <span>Add Book</span>
          </NavDropdown.Item>
          <NavDropdown.Item onClick={logout}>
            <img
              className="me-2"
              style={{ fontSize: "24px" }}
              src={Logout}
              alt=""
            />
            <span>Logout</span>
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </>
  );
}
