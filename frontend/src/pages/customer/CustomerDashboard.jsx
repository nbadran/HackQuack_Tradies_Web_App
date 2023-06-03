import React, { useContext, useEffect, useState } from "react";
import { Nav, Navbar, Container, Button, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function CustomerDashboard() {
  const { user } = useContext(AuthContext);
console.log(user)
  return (
    <div>
      <Navbar bg="customer-tab" variant="light">
        <Container>
          <LinkContainer to="/customer-dashboard">
            <Navbar.Brand>
              <Image
                src="/favicon.ico"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt=""
              />{" "}
              HACKQUACK
            </Navbar.Brand>
          </LinkContainer>
          <LinkContainer to="/customer-service-board-request">
            <Nav.Link>Service Board</Nav.Link>
          </LinkContainer>
          <Navbar.Collapse className="justify-content-end">
            <LinkContainer to="/customer-account">
              <Nav.Link>
                {user.firstName} {user.lastName}{" "}
                <Image
                  src="/newlogo.ico"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt=""
                />
              </Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-5">
        <h1>
          Welcome, {user.firstName} {user.lastName}!
        </h1>

        <h3>Customer Account</h3>

        <hr />

        <div className="d-grid gap-2">
          <LinkContainer to="/customer-account">
            <Button className="btn-customer-button" variant="primary" size="lg">
              Account
            </Button>
          </LinkContainer>

          <LinkContainer to="/customer-create-new-request">
            <Button className="btn-primary" size="lg">
              Create New Request
            </Button>
          </LinkContainer>

          <LinkContainer to="/customer-service-board-request">
            <Button className="btn-primary" size="lg">
              Service Board
            </Button>
          </LinkContainer>

          <LinkContainer to="/customer-payment-transaction">
            <Button className="btn-primary" size="lg">
              Payment Transaction
            </Button>
          </LinkContainer>
        </div>

        <hr />

        <div className="d-grid gap-2">
          <Button href="/" variant="warning" size="lg">
            Log Out
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default CustomerDashboard;
