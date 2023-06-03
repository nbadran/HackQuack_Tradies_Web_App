import React from "react";
import { Container, Button, Card, Row, Col, Form } from "react-bootstrap";

function ProfessionalServiceBoardRequestDetail() {
  return (
    <Container className="py-5">
      <div className="container py-3">
        <Card>
          <Card.Body>
            <h1>Customer Name</h1>

            <hr />

            <Form.Group className="mb-3" controlId="formBasicInformation">
              <Form.Label>Information</Form.Label>
              <Form.Control type="text" placeholder="Information" disable />
            </Form.Group>
          </Card.Body>
          <Card.Footer>Location</Card.Footer>
        </Card>
      </div>
    </Container>
  );
}

export default ProfessionalServiceBoardRequestDetail;
