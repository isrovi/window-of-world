import React, { useState, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Table,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Drop from "../assets/images/drop.png";

import Navbar from "../components/Navbar";

import { API } from "../config/api";

export default function Transaction() {
  let history = useHistory();

  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const response = await API.get("/transactions/");
      setTransactions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let status = {
        remainingActive: 30,
        userStatus: "Active",
        paymentStatus: "Approved",
      };

      const response = await API.patch("/transaction/" + id, status, config);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let status = {
        paymentStatus: "Cancel",
      };

      const response = await API.patch("/transaction/" + id, status, config);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [handleApprove()]);

  return (
    <>
      <Container fluid>
        <Row className="px-4">
          <Navbar />
          <Col md={1}></Col>
          <Col md={10}>
            <h1 className="mb-5 fw-bold">Incoming Transaction</h1>
            <Table responsive="md" striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Users</th>
                  <th>Bukti Transfer</th>
                  <th>Remaining Active</th>
                  <th>Status User</th>
                  <th>Status Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.User.fullName}</td>
                    <td>
                      <img
                        src={item.transferProof}
                        style={{
                          height: "80px",
                          width: "80x",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{item.remainingActive} / Hari</td>
                    <td
                      className={
                        item.userStatus === "Active"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {item.userStatus}
                    </td>
                    <td>{item.paymentStatus}</td>
                    <td>
                      <DropdownButton
                        variant="flat"
                        title={<img src={Drop} alt="" />}
                        cssClass="e-caret-hide"
                      >
                        <Dropdown.Item
                          className="text-success"
                          onClick={() => handleApprove(item.id)}
                        >
                          Approved
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-danger"
                          onClick={() => handleCancel(item.id)}
                        >
                          Cancel
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    </>
  );
}
