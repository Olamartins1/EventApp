import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../../assets/AuthContext/AuthContext";

const NotificationsContainer = styled.div`
  flex: 1;
  width: 90%;
  background-color: #f8f9fa;
  padding: 2rem;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #999;
  margin: 0;
`;

const Badge = styled.div`
  background-color: #7c4dbd;
  color: white;
  border-radius: 20px;
  padding: 0.35rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const NotificationItem = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const EventTitle = styled.h3`
  font-size: 1rem;
  color: #1a1a1a;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
`;

const EventDetails = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin: 0 0 0.25rem 0;
`;

const TimeAgo = styled.span`
  font-size: 0.8rem;
  color: #aaa;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 1rem;
  color: #555;
  margin-top: 3rem;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #777;
  margin-top: 4rem;
`;

const MyNotifications = () => {
  const { token } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/client-notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data?.data || [];
        setNotifications(data);
      } catch (error) {
        console.log("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchNotifications();
  }, [token]);

  return (
    <NotificationsContainer>
      <Header>
        <div>
          <Title>Notifications</Title>
          <Subtitle>Stay updated with your latest activities</Subtitle>
        </div>
        <Badge>{notifications.length} New</Badge>
      </Header>

      {loading ? (
        <Loading>Loading notifications...</Loading>
      ) : notifications.length > 0 ? (
        <NotificationList>
          {notifications.map((note) => (
            <NotificationItem key={note._id}>
              <EventTitle>{note.notificationTitle}</EventTitle>
              <EventDetails>{note.notificationMsg}</EventDetails>
              <TimeAgo>{note.time}</TimeAgo>
            </NotificationItem>
          ))}
        </NotificationList>
      ) : (
        <EmptyState>No notifications yet</EmptyState>
      )}
    </NotificationsContainer>
  );
};

export default MyNotifications;
