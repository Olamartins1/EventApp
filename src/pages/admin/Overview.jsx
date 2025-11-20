import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { BsBuilding } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { RiHashtag, RiVerifiedBadgeLine } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";

const Overview = () => {
  const [stats, setStats] = useState({
    totalVenues: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [management, setManagement] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOverviewStats = async () => {
      try {
        const response = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/overview",

          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;


        setStats({
          totalVenues: data.analysis.totalVenues || 0,
          totalUsers: data.analysis.totalUser || 0,
          totalBookings: data.analysis.totalBookings || 0,
          totalRevenue: data.analysis.totalRevenue || 0,
        });
        setManagement(data.totalManagement || []);
      } catch (err) {
        console.error("Failed to fetch overview stats:", err);
      }
    };

    fetchOverviewStats();
  }, []);

  const statsData = [
    {
      title: "Total Venues",
      value: stats.totalVenues,
      icon: <BsBuilding />,
      iconBg: "#e9d5ff",
      iconColor: "purple",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FiUsers />,
      iconBg: "#e3e9fa",
      iconColor: "blue",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: <CiCalendar />,
      iconBg: "#e3e9fa",
      iconColor: "blue",
    },
    {
      title: "Total Revenue",
      value: stats.totalRevenue,
      icon: <RiHashtag />,
      iconBg: "#e0cb8c",
      iconColor: "orange",
    },
  ];

  return (
    <Container>
      <Wrapper>
        <WelcomeSection>
          <WelcomeText>Dashboard Overview</WelcomeText>
          <DateText>
            Welcome back! Here's what's happening with your venues.
          </DateText>
        </WelcomeSection>
        <StatsGrid>
          {statsData.map((stat, index) => (
            <StatCard key={index}>
              <StatHeader>
                <StatTitle>{stat.title}</StatTitle>
                <StatIcon $bgColor={stat.iconBg} $color={stat.iconColor}>
                  {stat.icon}
                </StatIcon>
              </StatHeader>
              <StatValue>{stat.value}</StatValue>
            </StatCard>
          ))}
        </StatsGrid>

        <SubContainer>
          <Subtitle>
            <h4>Bookings Management</h4>
            <h5>Manage all venue bookings and caution fee refunds</h5>
          </Subtitle>
          <ContactDetail>
            <ContactWrapper>
              {management.map((item) => (
                <Detail key={item._id}>
                  <div className="icon">
                    <FiUsers />
                  </div>
                  <div className="names">
                    <p style={{ color: "black", fontSize: "18px" }}>
                      {item.clientId}
                    </p>
                    <p style={{ fontSize: "13px", color: "gray" }}>
                      {item.eventType}
                    </p>
                    <p style={{ color: "black", fontSize: "18px" }}>Venue</p>
                    <p style={{ fontSize: "13px", color: "gray" }}>
                      {item.venueOwnerId}
                    </p>
                  </div>
                  <div className="eventDate">
                    <p style={{ color: "black", fontSize: "16px" }}>
                      Event Date
                    </p>
                    <p style={{ fontSize: "13px", color: "gray" }}>
                      {item.date}
                    </p>
                  </div>
                  <div className="bookingAmount">
                    <p style={{ color: "black", fontSize: "16px" }}>
                      Booking Amount
                    </p>
                    <p style={{ fontSize: "13px", color: "gray" }}>
                      {" "}
                      ₦{item.total.toLocaleString()}
                    </p>
                  </div>
                  <div className="cautionFee">
                    <p style={{ color: "black", fontSize: "16px" }}>
                      Caution fee
                    </p>
                    <p style={{ fontSize: "13px", color: "gray" }}>
                      {" "}
                      {item.servicecharge
                        ? `₦${item.servicecharge.toLocaleString()}`
                        : "₦0"}
                    </p>
                  </div>
                  <div className="btn">
                    <div className="btn-icon">
                      <RiVerifiedBadgeLine />
                    </div>
                    <button>
                      {" "}
                      {item.paymentstatus === "paid" ? "Paid" : "Mark as paid"}
                    </button>
                  </div>
                </Detail>
              ))}
            </ContactWrapper>
          </ContactDetail>
        </SubContainer>
      </Wrapper>
    </Container>
  );
};

export default Overview;

const Container = styled.div`
  width: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  background: #efebf2;

  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

const Wrapper = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const WelcomeText = styled.h2`
  color: #0a0a0a;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const DateText = styled.p`
  color: #717182;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  @media (max-width: 480px) {
    font-size: 12px;
    width: 80%;
  }
`;

const StatsGrid = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 32px;
  margin-top: 30px;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 20px;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    display: flex;
    overflow-x: auto;
    gap: 8px;
    padding-bottom: 8px;
    scroll-snap-type: x mandatory;
    width: 100%;

    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #cfcfcf;
      border-radius: 10px;
    }
  }
`;

const StatCard = styled.div`
  background: white;
  width: 21%;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    padding: 16px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 16px;
  }

  @media (max-width: 480px) {
    min-width: 130px;
    max-width: 130px;
    padding: 10px;
    border-radius: 10px;
    scroll-snap-align: center;
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const StatTitle = styled.h3`
  color: var(--Black-400, #545454);
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 34px;
    height: 34px;
    font-size: 16px;
    border-radius: 8px;
  }
`;

const StatValue = styled.div`
  color: var(--Black-500, #292929);
  font-family: Poppins;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 28px;
  }

@media (max-width: 480px) {
  font-size: 20px;
}
`;

const SubContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f4f6;
  border-radius: 12px;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 10px 0;
    width: 85%;
    margin-left: -1px;
  }
`;

const Subtitle = styled.div`
  display: flex;
  width: 400px;
  height: 97px;
  padding-left: 24px;
  flex-direction: column;
  flex-shrink: 0;

  h4 {
    color: #0a0a0a;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 12px;
  }

  h5 {
    color: #717182;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-top: 12px;
  }

  @media (max-width: 480px) {
    padding-left: 12px;
    margin-bottom: 6px;

    h4 {
      font-size: 14px;
    }

    h5 {
      font-size: 12px;
      width: 70%;
    }
  }
`;

const ContactDetail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContactWrapper = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;
  margin-top: 20px;
  @media (max-width: 480px) {
    width: 80%;
    margin-left: 12px;
    padding: 0 10px;
    margin-top: 12px;
  }
`;

const Detail = styled.div`
  width: 100%;
  height: 180px;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .icon {
    width: 50px;
    height: 50px;
    color: #0e4bf1;
    background: #e3e9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 24px;
    margin-top: 0px;
    margin-left: 10px;
  }

  .names {
    margin-left: 15px;
    width: 30%;
    height: 90%;
  }

  .eventDate {
    width: 15%;
    height: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
  }

  .bookingAmount {
    width: 15%;
    height: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-left: 25px;
  }

  .cautionFee {
    width: 15%;
    height: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-left: 25px;
  }

  .btn {
    width: 15%;
    height: 20%;
    background: green;
    margin-left: 25px;
    margin-right: 5px;
    border-radius: 8px;
    display: flex;
    align-items: center;
  }

  .btn-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    margin-left: 10px;
  }
  button {
    width: 90%;
    height: 100%;
    border: none;
    background: transparent;
    color: #fff;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    height: auto;
    padding: 16px;
  }

  .icon {
    width: 50px;
    height: 50px;
    color: #0e4bf1;
    background: #e3e9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 24px;
    margin-left: 10px;

    @media (max-width: 480px) {
      margin-left: 0;
    }
  }

  .names,
  .eventDate,
  .bookingAmount,
  .cautionFee {
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 480px) {
      width: 80%;

      align-items: flex-start;
      margin-left: 0 !important;
      gap: 2px;
    }
  }

  /* Desktop widths */
  .names {
    width: 20%;
  }
  .eventDate {
    width: 15%;
  }
  .bookingAmount {
    width: 15%;
  }
  .cautionFee {
    width: 15%;
  }

  /* -------- MOBILE BUTTON FIX -------- */
  .btn {
    width: 15%;
    height: 40px;
    background: green;
    margin-left: 25px;
    margin-right: 5px;
    border-radius: 8px;
    display: flex;
    align-items: center;

    @media (max-width: 480px) {
      width: 50%;
      margin: 10px 0 0 0;
      height: 45px;
      justify-content: center;
    }
  }

  .btn-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    margin-left: 10px;

    @media (max-width: 480px) {
      margin-left: 0;
      margin-right: 6px;
      width: 30px;
    }
  }

  button {
    width: 90%;
    height: 100%;
    border: none;
    background: transparent;
    color: #fff;
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;

    @media (max-width: 480px) {
      width: auto;
    }
  }
`;
