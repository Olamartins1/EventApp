import React, { useState } from "react";
import styled from "styled-components";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // const [ loading, setLoading ] = useState()

  const navigate = useNavigate();
  const navigatetoverify = () => {
    // navigate("/verifyemail");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    try {
      const endpoint = BaseUrl
        ? `${BaseUrl}/forgotPassword`
        : "https://eventiq-final-project.onrender.com/api/v1/forgotPassword";

      console.log("Forgot password request to:", endpoint);

      const res = await axios.post(
        endpoint,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", res.data);
      localStorage.setItem("userEmail", email);
      toast.success(res?.data?.message);
      setEmail("");
      navigatetoverify();
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        err?.response?.data?.message ||
          "Failed to send verification code. Please try again."
      );
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Card>
        <CloseBtn>×</CloseBtn>
        <Title>Forgot Password</Title>
        <Subtitle>
          Don’t worry we will help your recover your account.
          <br /> Enter your email, let us confirm it’s you
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          <Label>
            <MdEmail className="icon" /> Email Address
          </Label>

          <Input
            placeholder="youremail@example.com"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          {error && (
            <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>
          )}

          <Button type="submit">Send Verification Code</Button>
        </Form>

        <Footer>
          Remember Password?
          <Link to="/login">
            <span>Sign In</span>
          </Link>
        </Footer>
      </Card>
    </Container>
  );
};

export default ForgotPassword;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background: white;
  width: 420px;
  border-radius: 10px;
  padding: 2rem;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 1.3rem;
  cursor: pointer;
`;

const Title = styled.h2`
  font-style: normal;
  font-weight: 500;
  line-height: 125%;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #444;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  .icon {
    font-size: 1rem;
  }
`;

const Input = styled.input`
  width: 92%;
  padding: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #6b46c1;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #603379;
  color: white;
  border: none;
  padding: 0.9rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: 0.3s;

  &:hover {
    background: #4c32b8;
  }
`;

const Footer = styled.p`
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  color: #555;

  span {
    color: #000;
    font-weight: 600;
    cursor: pointer;
  }
`;
