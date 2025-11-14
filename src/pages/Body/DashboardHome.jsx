import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  BsBuilding,
  BsCalendar2Check,
  BsShieldCheck,
  BsBox,
  BsChevronDown,
} from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import {
  FiCalendar,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiBell,
  FiSearch,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";
import { LuBuilding2 } from "react-icons/lu";
import { IoTrendingUpOutline, IoAddCircleOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
import { Key } from "lucide-react";
import { toast } from "react-toastify";
const DashboardHome = () => {
  const [statsData, setStatsData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [booking, setBooking] = useState([]);
  console.log("book", booking);
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState("");
  const [bookingstatus, setBookingstatus] = useState(false);

  const { token } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const [deleteid, setDeleteid] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("the res data checking total", res.data?.data);

        setStatsData(res.data?.data || {});
        console.log("the start", res.data?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/allbooking",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

        );
        setBooking(res.data?.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [token]);

  const acceptBooking = async (bookingid) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://eventiq-final-project.onrender.com/api/v1/acceptbooking/${bookingid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("the am the booking", res);
      toast.success(res?.data?.message);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const rejectBooking = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `https://eventiq-final-project.onrender.com/api/v1/rejectbooking/${deleteid}`,
        { reason: rejectionReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("the mess", res);
      toast.error(res?.data?.message);
    } catch (err) {
      toast.error(err?.res?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <WelcomeSection>
          <WelcomeText>Welcome, {user.firstName}</WelcomeText>
          <DateText>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </DateText>
        </WelcomeSection>

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <StatsGrid>
            <StatCard>
              <StatHeader>
                <StatTitle>Total Venues </StatTitle>
                <StatIcon
                  $bgColor={statsData.iconBg}
                  $color={statsData.iconColor}
                >
                  <LuBuilding2 style={{ color: "purple" }} />
                </StatIcon>
              </StatHeader>
              <StatValue>{statsData?.totalVenues}</StatValue>
            </StatCard>
            <StatCard>
              <StatHeader>
                <StatTitle>Active Bookings </StatTitle>
                <StatIcon
                  $bgColor={statsData.iconBg}
                  $color={statsData.iconColor}
                >
                  <FiCalendar style={{ stroke: "yellow" }} />
                </StatIcon>
              </StatHeader>
              <StatValue>{statsData?.activeBooking}</StatValue>
            </StatCard>
            <StatCard>
              <StatHeader>
                <StatTitle>Revenue (this Month) </StatTitle>
                <StatIcon
                  $bgColor={statsData.iconBg}
                  $color={statsData.iconColor}
                >
                  <TbCurrencyNaira style={{ stroke: "green" }} />
                </StatIcon>
              </StatHeader>
              <StatValue>₦{statsData?.revenue}</StatValue>
            </StatCard>
            <StatCard>
              <StatHeader>
                <StatTitle>Occupancy Rate </StatTitle>
                <StatIcon
                  $bgColor={statsData.iconBg}
                  $color={statsData.iconColor}
                >
                  <IoTrendingUpOutline style={{ stroke: "purple" }} />
                </StatIcon>
              </StatHeader>
              <StatValue>{statsData?.occupancyRate?.total}%</StatValue>
            </StatCard>
          </StatsGrid>
        )}
        {console.log("booooooo", booking)}
        <BookingCard>
          {loading ? (
            <h3 style={{ textAlign: "center", color: "#555" }}>
              Loading bookings...
            </h3>
          ) : booking.length > 0 ? (
            <BookingList>
              {/* <div className="book_holder"> */}
              {booking.map((item, index) => {
                const isPending = item.bookingstatus === "pending";
                const buttonText = isPending ? "Accept" : "Accepted";

                return (
                  <BookingCard key={index}>
                    <div style={{ width: "100%" }}>
                      <VenueName>{item.venueId.venuename}</VenueName>

                      <div style={{ display: "flex", gap: "7px" }}>
                        <CustomerName>{item.clientId.firstName}</CustomerName>
                        <CustomerName>{item.clientId.surname}</CustomerName>
                        <GoDotFill style={{ marginTop: "2rem" }} />
                        <CustomerName>
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </CustomerName>
                      </div>

                      <Occasion>{item.eventType}</Occasion>
                      <Price>₦{item.venueId.price}</Price>

                      <Actions
                        style={{
                          justifyContent: "flex-end",
                          marginTop: "10px",
                        }}
                      >
                        <AcceptButton
                          disabled={!isPending}
                          onClick={() => {
                            acceptBooking(item._id);
                            setTimeout(() => window.location.reload(), 5000);
                          }}
                        >
                          {buttonText}
                        </AcceptButton>

                        {isPending && (
                          <RejectButton
                            style={{ marginTop: "-2rem" }}
                            onClick={() => {
                              setDeleteid(item._id);
                              setShowPopup(true);
                            }}
                          >
                            Reject
                          </RejectButton>
                        )}
                      </Actions>
                    </div>
                  </BookingCard>
                );
              })}

              {showPopup && (
                <PopupOverlay>
                  <PopupBox>
                    <h3 style={{ marginBottom: "1rem" }}>Reject Booking</h3>
                    <p style={{ color: "#555", marginBottom: "1.5rem" }}>
                      Please provide a reason for rejection:
                    </p>

                    <input
                      type="text"
                      placeholder="Enter reason..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      style={{
                        width: "100%",
                        height: "70px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        marginBottom: "1.5rem",
                      }}
                    />

                    <div style={{ display: "flex", gap: "1rem" }}>
  <button
  style={{
    background: "#e53935",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
  onClick={async () => {
    try {
      setLoading(true);
      await rejectBooking(); 
      toast.success("Booking rejected successfully");
      setShowPopup(false); 
      window.location.reload(); 
    } catch (err) {
     console.log(err)
    } finally {
      setLoading(false);
    }
  }}
>
  Reject
</button>



                      <button
                        style={{
                          background: "#f1f1f1",
                          color: "#333",
                          border: "none",
                          padding: "10px 20px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setRejectionReason("");
                          setShowPopup(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </PopupBox>
                </PopupOverlay>
              )}
              {/* </div> */}
            </BookingList>
          ) : (
            <p style={{ textAlign: "center", color: "#777", fontSize: "15px" }}>
              No bookings available at the moment.
            </p>
          )}
        </BookingCard>

        {/* <EmptyState>
        <EmptyIcon>
          <BsBox />
        </EmptyIcon>
        <EmptyTitle>No Records Yet</EmptyTitle>
        <EmptyText>
          Create your first venue to start managing bookings and events
        </EmptyText>
      </EmptyState> */}
      </Wrapper>
    </Container>
  );
};

export default DashboardHome;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  background: #f8f9fa;
  gap: 1rem;

  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

const Wrapper = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
const BookingCard = styled.div`
  background: #fff;
  border-radius: 12px;
  height: 5%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
`;
const BookingList = styled.div`
  display: flex;
  background: #f8f9fa;
  flex-direction: column;

  gap: 1.5rem;
`;

const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const VenueName = styled.h3`
  font-size: 23px;
  font-weight: 600;
  color: #1e1e1e;
  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 18px;
  }
`;

const CustomerName = styled.p`
  font-size: 23px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-top: 1.5rem;
  }
`;

const Occasion = styled.p`
  font-size: 18px;
  margin-top: -17px;
  color: #999;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #805c94;
  margin-top: -15px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AcceptButton = styled.button`
  background: #00c853;
  color: #fff;
  font-size: 14px;
  margin-top: -2rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #00b44a;
  }

  &:hover:not(:disabled) {
    background-color: #43a047;
  }

  &:disabled {
    background-color: #c8e6c9;
    color: #666;
    cursor: not-allowed;
    opacity: 0.7;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 18px;
  }
`;

const RejectButton = styled.button`
  background: transparent;
  color: #e53935;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #e53935;
  border-radius: 8px;
  padding: 10px 50px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: red;
    color: white;
  }

  &:hover:not(:disabled) {
    background-color: #e53935;
  }

  &:disabled {
    background-color: #e53935;
    color: white;
    cursor: not-allowed;
    opacity: 0.7;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 18px;
  }
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const WelcomeText = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const DateText = styled.p`
  font-size: 14px;
  color: #9ca3af;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 12px;
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
    grid-template-columns: 1fr;
    gap: 10px;
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
    padding: 14px;
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
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  /* background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color}; */
  background: #f5e5c3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #111827;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const PopupBox = styled.div`
  background: #fff;
  width: 400px;
  max-width: 90%;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;

// const EmptyState = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 80px 32px;
//   background: white;
//   border-radius: 16px;

//   @media (max-width: 768px) {
//     padding: 60px 24px;
//     border-radius: 12px;
//   }

//   @media (max-width: 480px) {
//     padding: 40px 20px;
//   }
// `;

// const EmptyIcon = styled.div`
//   font-size: 72px;
//   color: #d1d5db;
//   margin-bottom: 20px;

//   @media (max-width: 768px) {
//     font-size: 60px;
//     margin-bottom: 16px;
//   }

//   @media (max-width: 480px) {
//     font-size: 48px;
//     margin-bottom: 12px;
//   }
// `;

// const EmptyTitle = styled.h3`
//   font-size: 22px;
//   font-weight: 600;
//   color: #374151;
//   margin: 0 0 8px 0;

//   @media (max-width: 768px) {
//     font-size: 20px;
//   }

//   @media (max-width: 480px) {
//     font-size: 18px;
//   }
// `;

// const EmptyText = styled.p`
//   font-size: 15px;
//   color: #9ca3af;
//   margin: 0 0 24px 0;
//   text-align: center;
//   max-width: 400px;

//   @media (max-width: 768px) {
//     font-size: 14px;
//     max-width: 350px;
//   }

//   @media (max-width: 480px) {
//     font-size: 13px;
//     max-width: 280px;
//   }
// `;
