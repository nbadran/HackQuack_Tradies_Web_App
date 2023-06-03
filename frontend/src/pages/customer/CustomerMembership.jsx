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

const customerMembershipAnuallyCost = 1000;

function CustomerMembership() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // CUSTOMER - GET MEMBERSHIP DETAIL
  const url = `/membership/client/${user.userId}`;
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

  // CUSTOMER - SUBSCRIBE
  async function handleSubscribe(event) {
    const url = `/membership/client`;
    const reqBody = {
      cost: customerMembershipAnuallyCost,
      client_id: user.userId,
    };

    const res = await axios.post(url, reqBody);

    if (res.status === 200) {
      alert("Successfully subscribe to membership!");
    } else {
      alert(JSON.stringify(res.data));
    }
  }

  // CUSTOMER - UNSUBSCRIBE
  async function handleUnsubscribe(event) {
    const url = `/membership/client/${user.userId}`;
    const reqBody = {
      client_id: user.userId,
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
        <h1>CUSTOMER MEMBERSHIP</h1>

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
                <h4>Customer Membership</h4>
                <p>billed anually</p>
                <h2>{customerMembershipAnuallyCost} AUD/year</h2>
              </Card.Header>
              <Card.Body>
                <p>&#9989; Became a member of HACKQUACK Tradies Family</p>
                <p>&#9989; Unlimited Assistance Callouts</p>
              </Card.Body>
            </Card>
          </Form.Group>

          <LinkContainer to="/payment-method">
            <Button class="btn-primary" size="lg">
              Edit Payment Method
            </Button>
          </LinkContainer>
        </Form>

        <hr />

        {/* BUTTON */}
        <div className="d-grid gap-2">
          <Button
            className="btn-customer-button"
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

export default CustomerMembership;
