import styled from "styled-components";

export const Container = styled.div`
  width: 420px;
  background: #fff;
  border-radius: 10px;
  padding: 25px 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
`;

export const Title = styled.h3`
  font-size: 1.1rem;
  color: #4b4b4b;
  margin-bottom: 15px;
  border-left: 4px solid #b2843c;
  padding-left: 8px;
`;

export const Section = styled.div`
  h4 {
    color: #4a148c;
    margin-bottom: 4px;
    font-size: 1rem;
  }

  p {
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 20px;
  }
`;

export const Label = styled.label`
  font-size: 0.85rem;
  color: #333;
  margin-bottom: 6px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  margin-bottom: 15px;

  &:focus {
    border-color: #7b2cbf;
  }

  &:disabled {
    background-color: #f8f8f8;
    cursor: not-allowed;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 15px;

  div {
    flex: 1;
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
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #5e1996;
  }
`;
