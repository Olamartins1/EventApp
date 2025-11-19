import React from "react";
import styled from "styled-components";

const Withdraw = () => {
  return (
    <Wrapper>
      <Card>
        <Header>
          <Amount>₦5,000</Amount>
          <Status className="processing">Processing</Status>
        </Header>

        <BankInfo>GTBank • 0987654321 • Ibrahim Ade</BankInfo>

        <Footer>
          <Date>Requested: Nov 18, 2025</Date>
        </Footer>
      </Card>
    </Wrapper>
  );
};

export default Withdraw;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  height: 400px;
  // background: yellow;
`;

const Card = styled.div`
  width: 97%;
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  font-family: "Inter", sans-serif;

  @media (max-width: 600px) {
    padding: 16px;
    width: 89%;
  }
  
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
   
    align-items: flex-start;
    gap: 8px;
  }
`;

const Amount = styled.h4`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: #111827;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const Status = styled.span`
  padding: 6px 14px;
  font-size: 18px;
  border-radius: 6px;
  font-weight: 500;
  text-transform: capitalize;

  &.processing {
    background-color: #fff7e6;
    color: #b76e00;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 4px 10px;
  }
`;

const BankInfo = styled.p`
  margin: 12px 0;
  font-size: 18px;
  color: #4b5563;
  font-weight: 500;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Footer = styled.div`
  margin-top: 10px;
`;

const Date = styled.p`
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;

  background: #e5e7eb;
  color: #6b7280;
  cursor: not-allowed;

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 13px;
  }
`;
