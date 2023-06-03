import React, { useState, useContext, useEffect } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AuthContext from "../../contexts/AuthContext";

import axios from "axios";
import { useLocation } from "react-router-dom";

function CustomerRatingAndReview() {
  const rating_value = [
    "Extremely Disappointed",
    "Disappointed",
    "Normal",
    "Satisfied",
    "Extremely Satisfied",
  ];

  const { state } = useLocation();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    clientId: user.userId,
    transactionId: state.id,
    rating: "",
    review: "",
  });
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(`rating-review/client/${state.id}`);
        console.log(data);
        if (data !== null) {
          setForm(data);
          setSubmitDisabled(true);
        }
      } catch (err) {
        alert(JSON.stringify(err));
      }
    }
    getData();
  }, []);

  function handleReviewChange(event) {
    setForm({ ...form, review: event.target.value });
  }
  function handleRatingChange(event) {
    setForm({ ...form, rating: parseInt(event.target.value) });
  }

  async function handleSubmit() {
    try {
      const res = await axios.post(`/rating-review/new-rating`, form);
      if (res.status === 200) {
        return alert("Successfully Rate Service");
      }
      return alert("Something went wrong");
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  return (
    <Container className="py-5">
      <div className="container py-3">
        <Card>
          <Card.Body>
            <h1>Rating and Review</h1>

            <hr />

            <Form>
              <Form.Group className="mb-3" controlId="formBasicServiceType">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  disabled={submitDisabled}
                  value={form.rating}
                  aria-label="rating"
                  onChange={handleRatingChange}
                >
                  <option value="">Please rate the service</option>
                  {rating_value.map((item, index) => {
                    return <option value={index + 1}>{item}</option>;
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTaskDescription">
                <Form.Label>Review</Form.Label>
                <Form.Control
                  disabled={submitDisabled}
                  onChange={handleReviewChange}
                  type="text"
                  value={form.review}
                  placeholder="Please write the review for the service"
                />
              </Form.Group>
            </Form>

            <hr />

            <div className="d-grid gap-2">
              <Button
                disabled={submitDisabled}
                className="btn-primary"
                size="lg"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <LinkContainer to="/">
                <Button className="btn-cancel" size="lg">
                  Cancel
                </Button>
              </LinkContainer>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default CustomerRatingAndReview;
