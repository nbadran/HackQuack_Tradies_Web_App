import React, { useEffect, useState, useContext } from "react";
import {
  Navbar,
  Nav,
  Image,
  Container,
  Card,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

function CustomerServiceBoardActive() {
  const { user } = useContext(AuthContext);
  const [getActiveRequest, setGetActiveRequest] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          `/service/client/get-active-request/${user.userId}`
        );
        setGetActiveRequest(data);
      } catch (err) {
        alert(JSON.stringify(err));
      }
    }
    getData();
  }, []);

  console.log(getActiveRequest);

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
          defaultActiveKey="/customer-service-board-active-service"
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

        {getActiveRequest.length === 0 ? (
          <>
            <br />
            No Active Service Available
          </>
        ) : (
          <>
            {getActiveRequest.map((data) => (
              <div className="container py-3">
                <Card>
                  <Card.Header>
                    Type of Issue:{" "}
                    {data.service_request.service_type.service_type_name}
                  </Card.Header>

                  <Card.Body>
                    <Card.Title>
                      {" "}
                      Service Title: {data.request_title}
                    </Card.Title>
                    <Card.Subtitle>
                      {" "}
                      Customer Name: {
                        data.service_request.client.first_name
                      }{" "}
                      {data.service_request.client.last_name}
                    </Card.Subtitle>
                    <Card.Text>Information: {data.description}</Card.Text>
                  </Card.Body>

                  <Card.Footer>
                    {`Location: ${data.service_request.client.address}, ${data.service_request.client.suburb}`}
                  </Card.Footer>
                  <Card.Footer>
                    Time: {new Date(data.request_time).toLocaleString()}
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

export default CustomerServiceBoardActive;
