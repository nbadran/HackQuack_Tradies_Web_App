import React from "react";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";

function Receipt() {
  return (
    <Container className="py-5">
      <div className="container py-3">
        <Card>
          <Card.Body>
            <h3>Receipt</h3>

            <hr />

            <Card.Text>Service Request ID: {}</Card.Text>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicCardNumber">
                <Form.Label>Total</Form.Label>
                <Form.Control type="text" value="" disable />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCardNumberInfo">
                <Row>
                  <Col>
                    <Form.Label>Date</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label>Time</Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Control type="text" value="" disable />
                  </Col>
                  <Col>
                    <Form.Control type="text" value="" disable />
                  </Col>
                </Row>
              </Form.Group>
            </Form>

            <hr />

            <div className="d-grid gap-2">
              <Button className="btn-primary" size="lg">
                Done
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default Receipt;
