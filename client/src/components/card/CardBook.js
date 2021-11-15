import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { Modal, Button } from "react-bootstrap";

import { API } from "../../config/api";

export default function CardBook({ item, index }) {
  let history = useHistory();
  const [state] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

  const [user, setUser] = useState();
  const getUser = async () => {
    try {
      const response = await API.get("/user/" + state.user.id);
      setUser(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  let isExist;
  if (user?.transaction.length <= 0) {
    isExist = false;
  } else if (user?.transaction[0].userStatus === "Not Active") {
    isExist = false;
  } else {
    isExist = true;
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {isExist ? (
        <Link
          style={{ textDecoration: "none" }}
          key={index}
          to={"/detail-book/" + item.id}
        >
          <img src={item.image} style={{ width: "200px", height: "270px" }} />
          <h5 className="mt-3" style={{ color: "black", fontWeight: "bold" }}>
            {item.title}
          </h5>
          <p className="mt-2" style={{ color: "#929292" }}>
            {item.author}
          </p>
        </Link>
      ) : (
        <>
          {" "}
          <div onClick={handleShow}>
            <img src={item.image} style={{ width: "200px", height: "270px" }} />
            <h5 className="mt-3" style={{ color: "black", fontWeight: "bold" }}>
              {item.title}
            </h5>
            <p className="mt-2" style={{ color: "#929292" }}>
              {item.author}
            </p>
          </div>
          <Modal centered show={show} onHide={handleClose}>
            <div className="p-4 text-danger text-center">
              please make a payment to read the latest books
            </div>
          </Modal>
        </>
      )}
    </>
  );
}
