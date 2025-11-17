import styled from "styled-components";

export const Container = styled.div`
  width: 420px;
  background: #fff;
  border-radius: 10px;
  padding: 25px 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    padding: 20px 16px;
    border-radius: 8px;
    margin: 0 auto;
  }
`;

export const Title = styled.h3`
  font-size: 1.1rem;
  color: #4b4b4b;
  margin-bottom: 15px;
  border-left: 4px solid #b2843c;
  padding-left: 8px;

  @media (max-width: 768px) {
    font-size: 1.05rem;
    margin-bottom: 12px;
  }
`;

export const Section = styled.div`
  h4 {
    color: #4a148c;
    margin-bottom: 4px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    h4 {
      font-size: 0.95rem;
    }

    p {
      font-size: 0.8rem;
      margin-bottom: 16px;
    }
  }
`;

export const Label = styled.label`
  font-size: 0.85rem;
  color: #333;
  margin-bottom: 6px;
  display: block;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 5px;
  }
`;

export const Input = styled.input`
  width: 80%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  margin-bottom: 15px;
  background-color: #f9f9f9;

  &:focus {
    border-color: #7b2cbf;
    background-color: #fff;
  }

  &:disabled {
    background-color: #f8f8f8;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 11px 12px;
    font-size: 0.85rem;
    margin-bottom: 14px;
  }
`;

export const Row = styled.div`
  display: flex;
width: 89%;

  div {
    flex: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 0;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #7b2cbf;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 5px;

  &:hover {
    background-color: #5e1996;
  }

  @media (max-width: 768px) {
   width:89%;
    font-size: 0.85rem;
    border-radius: 7px;
    margin-top: 8px;
  }
`;