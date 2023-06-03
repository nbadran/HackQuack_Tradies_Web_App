import React, { useEffect, useState, useContext } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProfessionalSignUp() {
  const [serviceTypes, setServiceTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/service-types`;
    async function fetchData() {
      const res = await axios.get(url);
      setServiceTypes(res.data);
    }
    fetchData();
  }, []);

  const service_type = serviceTypes;

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",

    abn: "",
    tfn: "",
    address: "",
    suburb: "",
    state: "",
    postcode: "",
    service_type_id: 0,
    password: "",
    confirm_password: "",
    type: "professional",
  });

  async function handleSubmit() {
    if (form.password !== form.confirm_password) {
      console.log("Password and confirm password don't match");
      return;
    }

    return navigate("/payment-method", { state: form });
  }

  function handleFirstNameChange(event) {
    setForm({ ...form, first_name: event.target.value });
  }

  function handleLastNameChange(event) {
    setForm({ ...form, last_name: event.target.value });
  }

  function handleEmailChange(event) {
    setForm({ ...form, email: event.target.value });
  }

  function handleABN(event) {
    setForm({ ...form, abn: event.target.value });
  }

  function handleTaxNumber(event) {
    setForm({ ...form, tfn: event.target.value });
  }

  function handleAddressChange(event) {
    setForm({ ...form, address: event.target.value });
  }

  function handlePhoneChange(event) {
    setForm({ ...form, phone: event.target.value });
  }

  function handleSuburbChange(event) {
    setForm({ ...form, suburb: event.target.value });
  }

  function handleStateChange(event) {
    setForm({ ...form, state: event.target.value });
  }

  function handlePostcodeChange(event) {
    setForm({ ...form, postcode: event.target.value });
  }

  function handleServiceTypeChange(event) {
    setForm({ ...form, service_type_id: event.target.value });
  }

  function handlePasswordChange(event) {
    setForm({ ...form, password: event.target.value });
  }

  function handleConfirmedPasswordChange(event) {
    setForm({ ...form, confirm_password: event.target.value });
  }

  return (
    <Container className="py-5">
      <h1>PROFESSIONAL SIGN UP</h1>

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
                placeholder="Enter first name"
                value={form.first_name}
                onChange={handleFirstNameChange}
                required
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={form.last_name}
                onChange={handleLastNameChange}
                required
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleEmailChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={handlePhoneChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTaxNumber">
          <Form.Label>Tax Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tax number"
            value={form.tfn}
            onChange={handleTaxNumber}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicABN">
          <Form.Label>ABN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ABN"
            value={form.abn}
            onChange={handleABN}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress_1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={form.address}
            onChange={handleAddressChange}
            required
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
                placeholder="Enter suburb"
                value={form.suburb}
                onChange={handleSuburbChange}
                required
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter state"
                value={form.state}
                onChange={handleStateChange}
                required
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter postcode"
                value={form.postcode}
                onChange={handlePostcodeChange}
                required
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicServiceType">
          <Form.Label>Service Type</Form.Label>
          <Form.Select
            aria-label="selectServiceType"
            value={form.serviceType}
            onChange={handleServiceTypeChange}
            required
          >
            <option>Please select</option>
            {service_type.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.service_type_name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handlePasswordChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirm Password"
            value={form.confirm_password}
            onChange={handleConfirmedPasswordChange}
            required
          />
        </Form.Group>
      </Form>

      <hr />

      <div className="d-grid gap-2">
        <Button onClick={handleSubmit} variant="primary" size="lg">
          Add Payment Method
        </Button>

        <Button href="/" className="btn-cancel" size="lg">
          Cancel
        </Button>
      </div>
    </Container>
  );
}

export default ProfessionalSignUp;
