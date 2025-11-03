import React from "react";
import styled from "styled-components";
import { FaFileInvoice, FaClock, FaWallet } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";

const Container = styled.div`
  padding: 2rem;
  background-color: #fafafa;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #999;
  font-weight: 400;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CardLabel = styled.span`
  font-size: 0.9rem;
  color: #999;
  font-weight: 400;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background-color: ${(props) => props.bgColor || "#f5f5f5"};
  color: ${(props) => props.color || "#666"};
`;

const Amount = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
`;

const AmountLabel = styled.div`
  font-size: 0.85rem;
  color: #999;
  font-weight: 400;
`;

const EmptyState = styled.div`
  background: white;
  border-radius: 12px;
  padding: 5rem 2rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: #666;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
`;

const EmptyTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const EmptyDescription = styled.p`
  font-size: 0.875rem;
  color: #999;
  font-weight: 400;
  line-height: 1.5;
`;

const Payment = () => {
  return (
    <Container>
      <Header>
        <Title>Payments & Earnings</Title>
        <Subtitle>
          Manage your earnings and featured hall subscriptions
        </Subtitle>
      </Header>

      <CardsGrid>
        <Card>
          <CardHeader>
            <CardLabel>Total Earnings</CardLabel>
            <IconWrapper bgColor="#f5f5f5" color="#666">
              <FaFileInvoice />
            </IconWrapper>
          </CardHeader>
          <Amount>#0</Amount>
          <AmountLabel>All time</AmountLabel>
        </Card>

        <Card>
          <CardHeader>
            <CardLabel>This Month</CardLabel>
            <IconWrapper bgColor="#d4f4dd" color="#34a853">
              <BiMoney />
            </IconWrapper>
          </CardHeader>
          <Amount>#0</Amount>
          <AmountLabel>All time</AmountLabel>
        </Card>

        <Card>
          <CardHeader>
            <CardLabel>Pending</CardLabel>
            <IconWrapper bgColor="#fff9e6" color="#f4b400">
              <FaClock />
            </IconWrapper>
          </CardHeader>
          <Amount>#0</Amount>
          <AmountLabel>Processing</AmountLabel>
        </Card>

        <Card>
          <CardHeader>
            <CardLabel>Available</CardLabel>
            <IconWrapper bgColor="#f5f5f5" color="#666">
              <FaWallet />
            </IconWrapper>
          </CardHeader>
          <Amount>#0</Amount>
          <AmountLabel>Ready to withdraw</AmountLabel>
        </Card>
      </CardsGrid>

      <EmptyState>
        <EmptyIcon>
          <FiPackage />
        </EmptyIcon>
        <EmptyTitle>No payments available yet</EmptyTitle>
        <EmptyDescription>
          Earnings data will appear here once transactions begin processing
        </EmptyDescription>
      </EmptyState>
    </Container>
  );
};

export default Payment;
