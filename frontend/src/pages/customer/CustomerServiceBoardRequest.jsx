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
  Form,
  FormGroup,
  Table,
} from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerServiceBoardRequest() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // GET ALL CURRENT REQUEST(S) FOR A SERVICE OF THE USER
  const url = `/service/client/all-request/${user.userId}`;
  const [allRequest, setAllRequest] = useState([]);
  const [offerForm, setOfferForm] = useState(false);
  const [serviceId, setServiceId] = useState(0);
  const [getAllOffer, setGetAllOffer] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(url);
        if (res.status === 200) {
          setAllRequest(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [url, reload]);

  async function handleViewAllOffers(event) {
    setServiceId(event.currentTarget.value);
    if (parseInt(serviceId) === parseInt(event.currentTarget.value)) {
      setOfferForm(!offerForm);
    } else {
      try {
        const { data } = await axios.get(
          `/service/client/view-offers/${event.currentTarget.value}`
        );
        setGetAllOffer(data);
        setOfferForm(true);
      } catch (err) {
        alert(JSON.stringify(err));
      }
    }
  }

  async function handleCancelRequestOnClick(event) {
    try {
      const res = await axios.delete(
        `/service/client/cancel-request/${event.currentTarget.value}`
      );
      if (res.status === 200) {
        alert("Successfully cancel request");
        setReload(!reload);
        setOfferForm(false);
      }
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  async function handleAcceptOfferOnClick(event) {
    try {
      const res = await axios.post(
        `/service/client/accept-offer/${event.currentTarget.value}`
      );
      if (res.status === 200) {
        alert("Successfully accept offer");
      }
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

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
          defaultActiveKey="/customer-service-board-request"
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

        <div>
          <Row>
            <Col>
              {allRequest.length === 0 ? (
                <>
                  <br />
                  No Request Available
                </>
              ) : (
                <>
                  {allRequest.map((data) => (
                    <div className="container py-3">
                      <Card>
                        <Card.Header>Service ID: {data.id}</Card.Header>

                        <Card.Body>
                          <Card.Title>
                            Service Title: {data.request_title}
                          </Card.Title>
                          <Card.Text>Service Type: {}</Card.Text>
                          <Card.Text>Information: {data.description}</Card.Text>
                          <Button
                            className="btn-warning"
                            value={data.id}
                            onClick={handleCancelRequestOnClick}
                          >
                            Cancel Request
                          </Button>{" "}
                          <Button
                            variant="primary"
                            value={data.id}
                            onClick={handleViewAllOffers}
                          >
                            Offer(s)
                          </Button>
                        </Card.Body>

                        <Card.Footer>
                          {`Location: ${data.client.address}, ${data.client.suburb}`}
                        </Card.Footer>
                        <Card.Footer>
                          Time:{" "}
                          {`${new Date(
                            data.request_time
                          ).toLocaleDateString()} ${new Date(
                            data.request_time
                          ).toLocaleTimeString()}`}
                        </Card.Footer>
                      </Card>
                    </div>
                  ))}
                </>
              )}
            </Col>
            {offerForm && (
              <Col>
                {getAllOffer.length === 0 ? (
                  <>
                    <br />
                    No Professional Offer
                  </>
                ) : (
                  <>
                    <div className="container py-3">
                      <strong>OFFER(S)</strong>
                      <p>Service Request ID: {serviceId}</p>
                      {getAllOffer.map((item) => {
                        return (
                          <Card>
                            <Card.Header>
                              Professional Name: {item.professional.first_name}{" "}
                              {item.professional.last_name}
                            </Card.Header>
                            <Card.Body>
                              <Card.Text>Price: {item.cost} AUD</Card.Text>
                              <Button
                                className="btn-primary"
                                value={item.id}
                                onClick={handleAcceptOfferOnClick}
                              >
                                Accept
                              </Button>
                            </Card.Body>

                            <Card.Footer>
                              Ratings: {item.professional_rating}/5
                            </Card.Footer>
                          </Card>
                        );
                      })}
                    </div>
                  </>
                )}
              </Col>
            )}
          </Row>
        </div>

        <hr />
      </Container>
    </div>
  );
}

export default CustomerServiceBoardRequest;
