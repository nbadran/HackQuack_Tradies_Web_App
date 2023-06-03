import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Image, Container, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerCreateNewRequest() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [service_type, setServiceType] = useState([]);
  const url = `/service-types`;
  useEffect(() => {
    async function getData() {
      const res = await axios.get(url);
      if (res.status === 200) {
        setServiceType(res.data);
      }
    }
    getData();
  }, [url]);

  const [form, setForm] = useState({
    taskTitle: "",
    taskDescription: "",
    serviceType: 0,
  });

  async function handleSubmit() {
    const url = `/service/client/new-request`;
    const reqBody = {
      client_id: user.userId,
      request_title: form.taskTitle,
      service_type_id: form.serviceType,
      description: form.taskDescription,
    };

    const res = await axios.post(url, reqBody);

    if (res.status === 200) {
      navigate("/customer-service-board-request");
    } else {
      alert(JSON.stringify(res.data));
    }
  }

  function handleTaskTitleChange(event) {
    setForm({ ...form, taskTitle: event.target.value });
  }

  function handleTaskDescriptionChange(event) {
    setForm({ ...form, taskDescription: event.target.value });
  }

  function handleServiceTypeChange(event) {
    setForm({ ...form, serviceType: event.target.value });
  }

  console.log(form);

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
        <Form>
          <h1>REQUEST NEW SERVICE</h1>

          <hr />

          <Form.Group className="mb-3" controlId="formBasicTaskTitle">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              value={form.taskTitle}
              onChange={handleTaskTitleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTaskDescription">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task description"
              value={form.taskDescription}
              onChange={handleTaskDescriptionChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicServiceType">
            <Form.Label>Service Type</Form.Label>
            <Form.Select
              aria-label="selectServiceType"
              value={form.serviceType}
              onChange={handleServiceTypeChange}
            >
              <option value="">Please select</option>
              {service_type.map((item, index) => {
                return (
                  <option value={item.id}>{item.service_type_name}</option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <hr />

          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={handleSubmit}>
              Make Request
            </Button>

            <LinkContainer to="/customer-dashboard">
              <Button variant="cancel" size="lg">
                Cancel
              </Button>
            </LinkContainer>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default CustomerCreateNewRequest;
