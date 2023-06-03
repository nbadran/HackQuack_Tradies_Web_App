import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Image, Container, Card, Button } from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

function ProfessionalServiceBoardOffer() {
  const { user } = useContext(AuthContext);
  const [getAllOffer, setGetAllOffer] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          `/service/professional/get-all-offer/${user.userId}`
        );
        setGetAllOffer(data);
      } catch (err) {
        alert(JSON.stringify(err));
      }
    }
    getData();
  }, [reload]);

  async function handleCancelOffer(event) {
    try {
      const res = await axios.delete(
        `/service/professional/cancel-offer/${event.currentTarget.value}`
      );
      alert("Successfully cancel offer");
      setReload(!reload);
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

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
        <h1>SERVICE BOARD</h1>

        <hr />

        <Nav
          className="justify-content-center"
          variant="tabs"
          defaultActiveKey="/professional-service-board-offer"
        >
          <LinkContainer to="/professional-service-board-request">
            <Nav.Item>
              <Nav.Link href="/professional-service-board-request">
                Request(s)
              </Nav.Link>
            </Nav.Item>
          </LinkContainer>

          <LinkContainer to="/professional-service-board-offer">
            <Nav.Item>
              <Nav.Link href="/professional-service-board-offer">
                Offer(s)
              </Nav.Link>
            </Nav.Item>
          </LinkContainer>

          <LinkContainer to="/professional-service-board-active-service">
            <Nav.Item>
              <Nav.Link href="/professional-service-board-active-service">
                Active Service(s)
              </Nav.Link>
            </Nav.Item>
          </LinkContainer>

          <LinkContainer to="/professional-service-board-past-service">
            <Nav.Item>
              <Nav.Link href="/professional-service-board-past-service">
                Past Service(s)
              </Nav.Link>
            </Nav.Item>
          </LinkContainer>
        </Nav>

        {getAllOffer.length === 0 ? (
          <>
            <br />
            No Offer Available
          </>
        ) : (
          <>
            {getAllOffer.map((data) => (
              <div className="container py-3">
                <Card>
                  <Card.Header>
                    Type of Issue:{" "}
                    {data.service_request.service_type.service_type_name}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      Service Title: {data.service_request.request_title}
                    </Card.Title>
                    <Card.Subtitle>{`Customer Name: ${data.service_request.client.first_name} ${data.service_request.client.last_name}`}</Card.Subtitle>
                    <Card.Text>
                      Description: {data.service_request.description}
                    </Card.Text>

                    <Button
                      className="btn-warning"
                      value={data.id}
                      onClick={handleCancelOffer}
                    >
                      Cancel Offer
                    </Button>
                  </Card.Body>

                  <Card.Footer>{`Location: ${data.service_request.client.address}, ${data.service_request.client.suburb}`}</Card.Footer>
                  <Card.Footer>{`Time: ${new Date(
                    data.service_request.request_time
                  ).toLocaleDateString()} ${new Date(
                    data.service_request.request_time
                  ).toLocaleTimeString()}`}</Card.Footer>
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

export default ProfessionalServiceBoardOffer;
