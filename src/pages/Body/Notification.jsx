import React from "react";
import styled from "styled-components";
import { FiPackage } from "react-icons/fi";

const NotificationsContainer = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  padding: 2rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #999;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const Badge = styled.div`
  background-color: #7c4dbd;
  color: white;
  border-radius: 20px;
  padding: 0.35rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  align-self: flex-start;

  @media (max-width: 768px) {
    align-self: flex-start;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.8rem;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
  padding: 2rem;

  @media (max-width: 768px) {
    min-height: 300px;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    min-height: 250px;
    padding: 1rem;
    gap: 0.75rem;
  }
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  color: #666;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const EmptyTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
  margin: 0;
  text-align: center;

  .SideNote {
    width: 60px;
    height: 26px;
    background: purple;
    border-radius: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
  }

  .Text {
    width: 20%;
    height: 70px;
    background: purple;
    margin-left: 0;
  }

  h4 {
    font-size: 20px;
    font-weight: 400;
    color: #fff;
    margin-top: 0;
  }
`;

const EmptyDescription = styled.p`
  font-size: 0.95rem;
  color: #999;
  margin: 0;
  text-align: center;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    max-width: 300px;
  }
`;

const Notifications = () => {
  return (
    <NotificationsContainer>
      <Header>
        <HeaderContent>
          <Title>Notifications</Title>
          <Subtitle>Stay updated with your latest activities</Subtitle>
        </HeaderContent>
        <Badge>0 New</Badge>
      </Header>

      <EmptyState>
        <IconWrapper>
          <FiPackage />
        </IconWrapper>
        <EmptyTitle>Nothing to show yet</EmptyTitle>
        <EmptyDescription>
          Notifications from bookings and payment will appear hear
        </EmptyDescription>
      </EmptyState>
    </NotificationsContainer>
  );
};

export default Notifications;
