import React from "react";
import { Container, Card, Form } from "react-bootstrap";

function CustomerServiceBoardRequestOfferDetail() {
  const data = [1, 2, 3, 4, 5];
  return (
    <Container className="py-5">
      <div className="container py-3">
        <Card>
          <Card.Body>
            <h1>Professional Name</h1>
            <hr />
            <Card.Text>Information: {}</Card.Text>
            <Card.Text>Price: {}</Card.Text>
          </Card.Body>
          <Card.Footer>Location</Card.Footer>
          <Card.Footer>
            Ratings and Reviews{" "}
            {data.map((data) => (
              <div className="container py-3">
                <Card>
                  <Card.Header>Customer name</Card.Header>
                  <Card.Body></Card.Body>
                </Card>
              </div>
            ))}
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
}

export default CustomerServiceBoardRequestOfferDetail;
