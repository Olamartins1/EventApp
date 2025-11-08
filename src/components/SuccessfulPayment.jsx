import React from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SuccessfulPayment = () => {
//   const navigate = useNavigate();

  return (
    <Container>
      <Card>
        <FaCheckCircle className="icon" />
        <h2>Payment Successful!</h2>
        <p>
          Your payment has been processed successfully. <br />
          Thank you for choosing Eventiq!
        </p>
        <button>
          Go to Dashboard
        </button>
      </Card>
    </Container>
  );
};

export default SuccessfulPayment;

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
    color: #22c55e;
    font-size: 3rem;
    margin-bottom: 1rem;
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

