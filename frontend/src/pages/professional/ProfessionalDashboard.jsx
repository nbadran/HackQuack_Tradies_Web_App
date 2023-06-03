import React, { useContext } from "react";
import { Container, Button, Navbar, Nav, Image } from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

function ProfessionalDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar bg="professional-tab" variant="light">
        <Container>
          <LinkContainer to="/professional-dashboard">
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

          <LinkContainer to="/professional-service-board-request">
            <Nav.Link>Service Board</Nav.Link>
          </LinkContainer>

          <Navbar.Collapse className="justify-content-end">
            <LinkContainer to="/professional-account">
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
        <h3>Professional Account</h3>

        <hr />

        <div className="d-grid gap-2">
          <LinkContainer to="/professional-account">
            <Button className="btn-professional-button" size="lg">
              Account
            </Button>
          </LinkContainer>

          <LinkContainer to="/professional-service-board-request">
            <Button className="btn-primary" size="lg">
              Service Board
            </Button>
          </LinkContainer>

          <LinkContainer to="/professional-payment-transaction">
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

export default ProfessionalDashboard;
