import React, { useContext, useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Image,
  Container,
  Card,
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Table,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const commisionFee = 5;

function ProfessionalServiceBoardRequest() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // GET CURRENTLY REQUEST(S) FOR A SERVICE FROM CUSTOMER USER
  const [reload, setReload] = useState(false);
  const [getAllRequests, setAllRequests] = useState([]);
  useEffect(() => {
    const url = `/service/professional/view-all-offers/${user.userId}`;
    async function getData() {
      try {
        const res = await axios.get(url);
        if (res.status === 200) {
          setAllRequests(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [reload]);

  // PROFESSIONAL OFFER SERVICE - FORM - PRICE AND DETAIL
  const [offerForm, setOfferForm] = useState(false);
  const [form, setForm] = useState({
    cost: 0,
    acceptance: 0,
    professional_id: user.userId,
    service_request_id: 0,
  });

  // PROFESSIONAL OFFER SERVICE
  const [serviceId, setServiceId] = useState(0);
  function handleOffer(event) {
    setServiceId(event.currentTarget.value);
    if (parseInt(serviceId) === parseInt(event.currentTarget.value)) {
      setOfferForm(!offerForm);
    } else {
      setOfferForm(true);
    }
  }

  // PROFESSIONAL OFFER SERVICE - SEND OFFER
  async function handleSendOffer(event) {
    const url = `/service/professional/new-offer`;
    const reqBody = {
      cost: form.cost,
      acceptance: 1,
      professional_id: user.userId,
      service_request_id: serviceId,
    };

    const res = await axios.post(url, reqBody);

    if (res.status === 200) {
      navigate("/professional-service-board-offer");
    } else {
      alert(JSON.stringify(res.data));
    }
  }

  async function handleDeclineRequest(event) {
    const url = `/service/professional/new-offer`;
    const reqBody = {
      acceptance: 0,
      professional_id: user.userId,
      service_request_id: parseInt(event.currentTarget.value),
    };

    const res = await axios.post(url, reqBody);

    if (res.status === 200) {
      alert("Successfully declined request");
      setOfferForm(false);
      setReload(!reload);
    } else {
      alert(JSON.stringify(res.data));
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
          defaultActiveKey="/professional-service-board-request"
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

        <div>
          <Row>
            <Col>
              {getAllRequests.length === 0 ? (
                <>
                  <br />
                  No Request Available
                </>
              ) : (
                <>
                  {getAllRequests.map((data) => {
                    return (
                      <div className="container py-3">
                        <Card>
                          <Card.Header>Service ID: {data.id}</Card.Header>
                          <Card.Body>
                            <Card.Title>{data.request_title}</Card.Title>
                            <Card.Subtitle>
                              Customer Name: {data.client.first_name}{" "}
                              {data.client.last_name}
                            </Card.Subtitle>
                            <br />
                            <Card.Text>
                              Service Type:{" "}
                              {data.service_type.service_type_name}
                            </Card.Text>
                            <Card.Text>
                              Information: {data.description}
                            </Card.Text>
                            <Button
                              className="btn-warning"
                              value={data.id}
                              onClick={handleDeclineRequest}
                            >
                              Decline Request
                            </Button>{" "}
                            <Button
                              className="btn-primary"
                              value={data.id}
                              onClick={handleOffer}
                            >
                              Offer Service
                            </Button>
                          </Card.Body>
                          <Card.Footer>{`Location: ${data.client.address}, ${data.client.suburb}`}</Card.Footer>
                          <Card.Footer>{`Time: ${new Date(
                            data.request_time
                          ).toLocaleDateString()} ${new Date(
                            data.request_time
                          ).toLocaleTimeString()}`}</Card.Footer>
                        </Card>
                      </div>
                    );
                  })}
                </>
              )}
            </Col>

            {offerForm && (
              <Col>
                <Form>
                  <FormGroup className="py-3" controlId="formPriceOffer">
                    <Form.Label>
                      <strong>PRICE AND DETAIL</strong>
                    </Form.Label>
                    <p>Service Request ID: {serviceId}</p>
                    <Table>
                      <tr>
                        <td>
                          <Form.Label>Service Price</Form.Label>
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            placeholder="Enter price"
                            value={form.cost}
                            onChange={(e) =>
                              setForm({ ...form, cost: e.target.value })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label>Comission Fee</Form.Label>
                        </td>
                        <td>
                          <Form.Control
                            value={parseInt(commisionFee)}
                            type="text"
                            placeholder=""
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label>Total Price</Form.Label>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            placeholder=""
                            disabled
                            value={parseInt(form.cost) + parseInt(commisionFee)}
                          />
                        </td>
                      </tr>
                    </Table>

                    <div className="d-grid gap-2">
                      <Button
                        className="btn-primary"
                        size="lg"
                        onClick={handleSendOffer}
                      >
                        Send Offer
                      </Button>
                    </div>
                  </FormGroup>
                </Form>
              </Col>
            )}
          </Row>
        </div>

        <hr />
      </Container>
    </div>
  );
}

export default ProfessionalServiceBoardRequest;
