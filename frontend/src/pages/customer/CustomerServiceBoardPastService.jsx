import React, { useEffect, useState, useContext } from "react";
import {
  Navbar,
  Nav,
  Image,
  Container,
  Button,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerServiceBoardPastService() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [getPastRequest, setGetPastRequest] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          `/service/client/get-past-service/${user.userId}`
        );
        setGetPastRequest(data);
      } catch (err) {
        alert(JSON.stringify(err));
      }
    }
    getData();
  }, []);

  async function handleSubmit(event) {
    return navigate("/customer-rating-and-review", {
      state: JSON.parse(event.target.value),
    });
  }

  async function handleRatingAndReviewOnClick(event) {}

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
        <h1>SERVICE BOARD</h1>

        <hr />

        <Nav
          className="justify-content-center"
          variant="tabs"
          defaultActiveKey="/customer-service-board-past-service"
        >
          <LinkContainer to="/customer-service-board-request">
            <Nav.Item>
              <Nav.Link href="/customer-service-board-request">
                Request(s)
              </Nav.Link>
            </Nav.Item>
          </LinkContainer>

          <LinkContainer to="/customer-service-board-active-service">
            <Nav.Item>
              <Nav.Link href="/customer-service-board-active-service">
                Active Service(s)
              </Nav.Link>
            </Nav.Item>
          </LinkContainer>

          <LinkContainer to="/customer-service-board-past-service">
            <Nav.Item>
              <Nav.Link href="/customer-service-board-past-service">
                Past Service(s)
              </Nav.Link>
            </Nav.Item>
          </LinkContainer>
        </Nav>

        {getPastRequest.length === 0 ? (
          <>
            <br />
            No Past Service Available
          </>
        ) : (
          <>
            {getPastRequest.map((data) => (
              <div className="container py-3">
                <Card>
                  <Card.Header>Service ID: {data.id}</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      {" "}
                      Service Title:{" "}
                      {
                        data.professional_service_request.service_request
                          .request_title
                      }
                    </Card.Title>
                    <Card.Subtitle>
                      Professional Name:{" "}
                      {
                        data.professional_service_request.professional
                          .first_name
                      }{" "}
                      {data.professional_service_request.professional.last_name}
                    </Card.Subtitle>
                    <br />
                    <Card.Text>
                      Service Type:{" "}
                      {
                        data.professional_service_request.service_request
                          .service_type.service_type_name
                      }
                    </Card.Text>
                    <Card.Text>
                      Information:{" "}
                      {
                        data.professional_service_request.service_request
                          .description
                      }
                    </Card.Text>
                    <Button
                      onClick={handleSubmit}
                      value={JSON.stringify(data)}
                      variant="primary"
                    >
                      Rating and Review
                    </Button>{" "}
                    <LinkContainer to="/receipt">
                      <Button variant="primary">Receipt</Button>
                    </LinkContainer>
                  </Card.Body>

                  <Card.Footer>
                    Time:{" "}
                    {new Date(
                      data.professional_service_request.service_request.request_time
                    ).toLocaleString()}
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </>
        )}

        <hr />
      </Container>
    </div>
  );
}

export default CustomerServiceBoardPastService;
