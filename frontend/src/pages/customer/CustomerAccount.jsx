import React, { useEffect, useState, useContext } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerAccount() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // GET USER-CUSTOMER DATA
  const url = `/user/client/${user.userId}`;
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(url);
        console.log(res.data);
        if (res.status === 200) {
          setCustomerData(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [url]);

  async function handleSubmit() {
    try {
      const url = `/user/client/${user.userId}`;
      const res = await axios.put(url, customerData);
      if (res.status === 200) {
        return alert("Successful");
      }
      return alert("Something wrong");
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  function handleFirstNameChange(event) {
    setCustomerData({ ...customerData, first_name: event.target.value });
  }

  function handleLastNameChange(event) {
    setCustomerData({ ...customerData, last_name: event.target.value });
  }

  function handleAddressChange(event) {
    setCustomerData({ ...customerData, address: event.target.value });
  }

  function handlePhoneChange(event) {
    setCustomerData({ ...customerData, phone: event.target.value });
  }

  function handleSuburbChange(event) {
    setCustomerData({ ...customerData, suburb: event.target.value });
  }

  function handleStateChange(event) {
    setCustomerData({ ...customerData, state: event.target.value });
  }

  function handlePostcodeChange(event) {
    setCustomerData({ ...customerData, postcode: event.target.value });
  }

  function handlePasswordChange(event) {
    setCustomerData({ ...customerData, password: event.target.value });
  }

  function handleConfirmedPasswordChange(event) {
    setCustomerData({ ...customerData, confirm_password: event.target.value });
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
        <h1>ACCOUNT</h1>
        <h2>Customer Account</h2>

        <hr />

        <div className="d-grid gap-2">
          <LinkContainer to="/customer-membership">
            <Button className="btn-customer-button" size="lg">
              Membership
            </Button>
          </LinkContainer>
        </div>

        <hr />

        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  value={customerData.first_name}
                  onChange={handleFirstNameChange}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={customerData.last_name}
                  onChange={handleLastNameChange}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={customerData.email}
              disabled="disabled"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress_1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={customerData.address}
              onChange={handleAddressChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress_1">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={customerData.phone}
              onChange={handlePhoneChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress_2">
            <Row>
              <Col>
                <Form.Label>Suburb</Form.Label>
              </Col>
              <Col>
                <Form.Label>State</Form.Label>
              </Col>
              <Col>
                <Form.Label>Postcode</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  value={customerData.suburb}
                  onChange={handleSuburbChange}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={customerData.state}
                  onChange={handleStateChange}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={customerData.postcode}
                  onChange={handlePostcodeChange}
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>

        <hr />

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="cancel" size="lg">
            Cancel
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default CustomerAccount;
