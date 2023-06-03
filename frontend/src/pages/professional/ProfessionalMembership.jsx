import React, { useEffect, useState, useContext } from "react";
import {
  Navbar,
  Nav,
  Image,
  Container,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const professionalMembershipAnuallyCost = 1000;

function ProfessionalMembership() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // PROFESSIONAL - GET MEMBERSHIP DETAIL
  const url = `/membership/professional/${user.userId}`;
  const [userMembershipDetails, setUserMembershipDetails] = useState({
    start_date: undefined,
    due_date: undefined,
  });
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(url);
        if (res.data !== null) {
          setUserMembershipDetails(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [url]);

  // PROFESSIONAL - SUBSRIBE
  async function handleSubscribe(event) {
    const url = `/membership/professional`;
    const reqBody = {
      cost: professionalMembershipAnuallyCost,
      professional_id: user.userId,
    };

    const res = await axios.post(url, reqBody);

    if (res.status === 200) {
      alert("Successfully subscribe to membership!");
    } else {
      alert(JSON.stringify(res.data));
    }
  }

  // PROFESSIONAL - UNSUBSCRIBE
  async function handleUnsubscribe(event) {
    const url = `/membership/professional/${user.userId}`;
    const reqBody = {
      professional_id: user.userId,
    };

    const res = await axios.delete(url, reqBody);

    if (res.status === 200) {
      alert("Successfully unsubscribe to membership!");
    } else {
      alert(JSON.stringify(res.data));
    }
  }

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
        <h1>PROFESSIONAL MEMBERSHIP</h1>

        <hr />

        <Form>
          <Form.Group className="mb-3" controlId="formBasicMembershipStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="text"
              value={
                new Date(userMembershipDetails.start_date).toLocaleString() ||
                "Invalid"
              }
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMembershipEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="text"
              value={
                new Date(userMembershipDetails.due_date).toLocaleString() ||
                "Invalid"
              }
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMembershipEndDate">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              value={
                new Date(userMembershipDetails.due_date) > new Date()
                  ? "Active"
                  : "Inactive"
              }
              disabled
            />
          </Form.Group>

          {/* HACKQUACK CUSTOMER MEMBERSHIP */}
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Card className="mx-auto" style={{ width: 350 }}>
              <Card.Header>
                <h4>Professional Membership</h4>
                <p>billed anually</p>
                <h2>{professionalMembershipAnuallyCost} AUD/year</h2>
              </Card.Header>
              <Card.Body>
                <p>&#9989; Became a member of HACKQUACK Tradies Family</p>
                <p>&#9989; Unlimited Assistance Callouts</p>
              </Card.Body>
            </Card>
          </Form.Group>

          <LinkContainer to="/add-payment-method">
            <Button className="primary" size="lg">
              Edit Payment Method
            </Button>
          </LinkContainer>
        </Form>

        <hr />

        {/* BUTTON */}
        <div className="d-grid gap-2">
          <Button
            className="btn-professional-button"
            size="lg"
            onClick={handleSubscribe}
          >
            Subscribe Membership
          </Button>

          <Button className="btn-cancel" size="lg" onClick={handleUnsubscribe}>
            Unsubscribe Membership
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default ProfessionalMembership;
