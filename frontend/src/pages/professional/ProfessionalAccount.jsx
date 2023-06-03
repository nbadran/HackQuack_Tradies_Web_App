import React, { useEffect, useContext, useState } from "react";
import {
  Container,
  Button,
  Navbar,
  Nav,
  Image,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import AuthContext from "../../contexts/AuthContext";
import axios from "axios";

function ProfessionalAccount() {
  const { user } = useContext(AuthContext);
  const [reload, setReload] = useState(false);

  // GET USER-PROFESSIONAL DATA
  const url = `/user/professional/${user.userId}`;
  const [professionalData, setProfessionalData] = useState({
    service_type: { service_type_name: undefined },
  });
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(url);
        console.log(res.data);
        if (res.status === 200) {
          setProfessionalData(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [reload]);

  async function handleSubmit() {
    try {
      const url = `/user/professional/${user.userId}`;
      const res = await axios.put(url, professionalData);
      if (res.status === 200) {
        setReload(!reload);
        return alert("Successful");
      }
      return alert("Something wrong");
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  function handleFirstNameChange(event) {
    setProfessionalData({
      ...professionalData,
      first_name: event.target.value,
    });
  }

  function handleLastNameChange(event) {
    setProfessionalData({ ...professionalData, last_name: event.target.value });
  }

  function handleAddressChange(event) {
    setProfessionalData({ ...professionalData, address: event.target.value });
  }

  function handleSuburbChange(event) {
    setProfessionalData({ ...professionalData, suburb: event.target.value });
  }

  function handleStateChange(event) {
    setProfessionalData({ ...professionalData, state: event.target.value });
  }

  function handlePostcodeChange(event) {
    setProfessionalData({ ...professionalData, postcode: event.target.value });
  }




  console.log(professionalData)


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
        <h1>ACCOUNT</h1>
        <h2>Professional Account</h2>

        <hr />

        <div className="d-grid gap-2">
          <LinkContainer to="/professional-membership">
            <Button className="btn-professional-button" size="lg">
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
                  value={professionalData.first_name}
                  onChange={handleFirstNameChange}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={professionalData.last_name}
                  onChange={handleLastNameChange}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value={professionalData.email} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress_1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={professionalData.address}
              onChange={handleAddressChange}
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
                  value={professionalData.suburb}
                  onChange={handleSuburbChange}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={professionalData.state}
                  onChange={handleStateChange}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={professionalData.postcode}
                  onChange={handlePostcodeChange}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTaxNumber">
            <Form.Label>Tax Number</Form.Label>
            <Form.Control type="text" value={professionalData.tfn} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicABN">
            <Form.Label>ABN</Form.Label>
            <Form.Control type="text" value={professionalData.abn} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Service Type</Form.Label>
            <Form.Control
              type="text"
              value={professionalData.service_type.service_type_name}
              disabled
            />
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

export default ProfessionalAccount;
