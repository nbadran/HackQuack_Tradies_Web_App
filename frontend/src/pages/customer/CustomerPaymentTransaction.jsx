import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";

import AuthContext from "../../contexts/AuthContext";
import axios from "axios";

function CustomerPaymentTransaction() {
  const { user } = useContext(AuthContext);

  // GET USER PAYMENT TRANSACTION
  const [dataStatement, setDataStatement] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`/transaction/client/${user.userId}`);
        if (res.status === 200) {
          setDataStatement(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  console.log(dataStatement);

  // GET CUSTOMER DATA

  return (
    <Container className="py-5">
      <h1>PAYMENT TRANSACTION</h1>

      <hr />

      <table class="table table-hover">
        <thead>
          <tr>
            <th>Payment Time</th>
            <th>Professional</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        {dataStatement.map((data) => (
          <tbody>
            <tr>
              <td>{new Date(data.payment_time).toLocaleString()}</td>
              <td>
                {data.professional_service_request.professional.first_name}{" "}
                {data.professional_service_request.professional.last_name}
              </td>
              <td>
                {
                  data.professional_service_request.service_request.client
                    .first_name
                }{" "}
                {
                  data.professional_service_request.service_request.client
                    .last_name
                }
              </td>
              <td>- {data.professional_service_request.cost} AUD</td>
              <td>
                {data.professional_service_request.service_request.description}
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      <hr />
    </Container>
  );
}

export default CustomerPaymentTransaction;
