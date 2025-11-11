import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SuccessfulPayment = () => {
  const { reference } = useParams();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://eventiq-final-project.onrender.com/api/v1/verify/?reference=${reference}`
        );
        console.log("Verification response:", response?.data);

        setQuery(response?.data);
        // Assuming API returns something like { success: true, ... }
        setSuccess(response?.data?.status === "success" || response?.data?.success === true);
      } catch (err) {
        console.error("Error verifying payment:", err);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchQuery();
  }, [reference]);

  if (loading) {
    return (
      <Container>
        <Card>
          <p>Verifying your payment, please wait...</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        {success ? (
          <>
            <FaCheckCircle className="icon success" />
            <h2>Payment Successful!</h2>
            <p>
              Your payment has been processed successfully. <br />
              Thank you for choosing <strong>Eventiq!</strong>
            </p>
            <button onClick={() => navigate("/individual-dashboard")}>
              Go to Dashboard
            </button>
          </>
        ) : (
          <>
            <FaTimesCircle className="icon failure" />
            <h2>Payment Failed!</h2>
            <p>
              Oops! We couldn't verify your payment. <br />
              Please try again or contact support.
            </p>
            <button onClick={() => navigate("/book-venue")}>
              Try Again
            </button>
          </>
        )}
      </Card>
    </Container>
  );
};

export default SuccessfulPayment;

// ---------- STYLES ----------
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #808080b3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background: white;
  width: 400px;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .success {
    color: #22c55e;
  }

  .failure {
    color: #ef4444;
  }

  h2 {
    font-size: 1.5rem;
    color: #111827;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6b7280;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }

  button {
    background: #000;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:hover {
      background: #333;
    }
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 1.5rem;

    h2 {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.9rem;
    }

    button {
      width: 100%;
    }
  }
`;
