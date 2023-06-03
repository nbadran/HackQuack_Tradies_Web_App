import React from "react";
import { Container, Button, Image, Card, Row, Col } from "react-bootstrap";

function Welcome() {
  return (
    <div className="background-color:#FBD603">
      <Container className="py-5">
        <Card className="shadow-lg mx-auto" style={{ width: 500 }}>
          <Card.Body>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              HACKQUACK TRADIES
            </h1>

            <Container style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src="/newlogo.ico"
                roundedCircle
                style={{ display: "flex", justifyContent: "centre" }}
              />
            </Container>

            {/*Button*/}
            <div className="d-grid gap-2">
              <Button className="btn-customer-button" href="/customer-sign-up">
                Sign up Customer
              </Button>
              <Button
                className="btn-professional-button"
                href="/professional-sign-up"
              >
                Sign up Professional
              </Button>
              <Button href="/login">Log in</Button>
            </div>
          </Card.Body>
        </Card>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div style={{ display: "flex", justifyContent: "center" }}>
          HackQuack Enterprises 2023 (TM)
        </div>
      </Container>
    </div>
  );
}

export default Welcome;
