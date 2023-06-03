import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentMethod() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [cardExpiry, setCardExpiry] = useState({
    month: "",
    year: "",
  });

  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    CVV: "",
    ...state,
  });

  async function handleSubmit() {
    const url = `/signup/${form.type}`;
    try {
      const data = await axios.post(url, form);
      if (data.status === 200) {
        alert("Successfully create account!");
        navigate("/");
      }
    } catch (err) {
      alert(JSON.stringify(err.message));
    }
  }

  function handleCardNumberChange(event) {
    setForm({ ...form, cardNumber: event.target.value });
  }

  useEffect(() => {
    setForm({
      ...form,
      expiry: new Date(cardExpiry.year, cardExpiry.month, 0),
    });
  }, [cardExpiry]);

  function handleCVVChange(event) {
    setForm({ ...form, CVV: event.target.value });
  }

  return (
    <Container className="py-5">
      <div className="container py-3">
        <Card>
          <Card.Body>
            <h1>Add Payment Method</h1>

            <hr />

            <Form>
              <Form.Group className="mb-3" controlId="formBasicCardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card number"
                  value={form.cardNumber}
                  onChange={handleCardNumberChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCardNumberInfo">
                <Row>
                  <Col>
                    <Row>
                      <Form.Label>Expiry</Form.Label>
                      <Col>
                        <Form.Control
                          type="text"
                          maxLength="2"
                          placeholder="MM"
                          value={cardExpiry.month}
                          onChange={(e) =>
                            setCardExpiry((cardExpiry) => ({
                              ...cardExpiry,
                              month: e.target.value,
                            }))
                          }
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          maxLength="4"
                          placeholder="YYYY"
                          value={cardExpiry.year}
                          onChange={(e) =>
                            setCardExpiry((cardExpiry) => ({
                              ...cardExpiry,
                              year: e.target.value,
                            }))
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter CVV"
                      value={form.CVV}
                      onChange={handleCVVChange}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>

            <hr />

            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" onClick={handleSubmit}>
                Sign Up
              </Button>
              <Button href="/" className="btn-cancel" size="lg">
                Cancel
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default PaymentMethod;
