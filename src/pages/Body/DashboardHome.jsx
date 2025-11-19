import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
// import OwnerBookings from "../pages/Body/OwnerBookings";
// import Withdraw from "../pages/Body/Withdraw";
import {
  BsBuilding,
  BsCalendar2Check,
  BsShieldCheck,
  BsBox,
  BsChevronDown,
} from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import {
  FiPackage,
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
import {
  IoTrendingUpOutline,
  IoAddCircleOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
import { Key } from "lucide-react";
import { toast } from "react-toastify";
import Loading from "../../components/static/Loading/Loading";
import { FaWallet } from "react-icons/fa";
import { AiOutlineTable } from "react-icons/ai";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState("ownerbookings");
  const [formData, setFormData] = useState({
    accountName: "",
    bank: "",
    amount: "",
    bankType: "",
    accountNumber: "",
  });

  const { token, user } = useContext(AuthContext);

  const [deleteid, setDeleteid] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/dashboard",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStatsData(res.data?.data || {});
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
          { headers: { Authorization: `Bearer ${token}` } }
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.error(res?.data?.message);
    } catch (err) {
      toast.error(err?.res?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = booking.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(booking.length / itemsPerPage);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWithdraw = async () => {
    // Validate form
    if (
      !formData.accountName ||
      !formData.bank ||
      !formData.amount ||
      !formData.bankType ||
      !formData.accountNumber
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://eventiq-final-project.onrender.com/api/v1/withdrawal",
        formData, // sending the accountName, bank, amount, bankType
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data?.message || "Withdrawal successful!");
      setShowModal(false); // close the modal
      setFormData({
        accountName: "",
        bank: "",
        amount: "",
        bankType: "",
      });

      // Optionally, update statsData to reflect new balance after withdrawal
      // setStatsData(prev => ({
      //   ...prev,
      //   occupancyRate: {
      //     ...prev.occupancyRate,
      //     total: prev.occupancyRate.total - Number(formData.amount)
      //   }
      // }));
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Withdrawal failed");
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
          <Loading />
        ) : (
          <StatsGrid>
            <StatCard>
              <StatHeader>
                <StatTitle>Total Venues </StatTitle>
                <StatIcon style={{ background: "#efebf2", color: "#805c94" }}>
                  <LuBuilding2 style={{ color: "#805c94" }} />
                </StatIcon>
              </StatHeader>
              <StatValue>{statsData?.totalVenues}</StatValue>
            </StatCard>
            <StatCard>
              <StatHeader>
                <StatTitle>Active Bookings </StatTitle>
                <StatIcon style={{ background: "#f5e5c3" }}>
                  <FiCalendar style={{ color: "#fddc56" }} />
                </StatIcon>
              </StatHeader>
              <StatValue>{statsData?.activeBooking}</StatValue>
            </StatCard>
            <StatCard>
              <StatHeader>
                <StatTitle>Revenue (this Month) </StatTitle>
                <StatIcon style={{ background: "#c2ffd5" }}>
                  <TbCurrencyNaira style={{ color: "#14dd50" }} />
                </StatIcon>
              </StatHeader>
              <StatValue>₦{statsData?.revenue}</StatValue>
            </StatCard>
            {/* Withdraw Card */}
            <StatCard onClick={() => setShowModal(true)}>
              <StatHeader>
                <StatTitle>Withdraw</StatTitle>
                
                <StatIcon style={{ background: "#efebf2" }}>
                 
                  <FaWallet style={{ color: "#805c94" }} />
                  
                </StatIcon>
                
              </StatHeader>
              <StatValue>{statsData?.occupancyRate?.total}₦</StatValue>
               <button>withdraw</button>
            </StatCard>
          </StatsGrid>
        )}

        <Dier>
          <div className="tabs">
            <div
              className={show === "ownerbookings" ? "tab active" : "tab"}
              onClick={() => {
                setShow("ownerbookings");
                navigate("/dashboardHome");
              }}
            >
              <AiOutlineTable className="icon" />
              <span>Bookings</span>
            </div>

            <div
              className={show === "Withdraw" ? "tab active" : "tab"}
              onClick={() => {
                setShow("Withdraw");
                navigate("/dashboardHome/Withdraw");
              }}
            >
              <IoNotificationsOutline className="icon" />
              <span>Withdrawal Request</span>
            </div>
          </div>
        </Dier>


        {/* Withdraw Modal */}
        {showModal && (
          <ModalBackground onClick={() => setShowModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseIcon onClick={() => setShowModal(false)} />
              <h2>Withdraw Funds</h2>
              <Input
                type="text"
                name="accountName"
                placeholder="Account Name"
                value={formData.accountName}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="bank"
                placeholder="Bank Name"
                value={formData.bank}
                onChange={handleChange}
              />
              <Input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
              />
              <Input
                type="number"
                name="accountNumber"
                placeholder="Account Number"
                value={formData.amountNumber}
                onChange={handleChange}
              />
              <Select
                name="bankType"
                value={formData.bankType}
                onChange={handleChange}
              >
                <option value="">Select Bank Type</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                <option value="fixed">Fixed</option>
                <option value="coporate">Corporate</option>
              </Select>
              <Button onClick={handleWithdraw} disabled={loading}>
                {loading ? "Processing..." : "Withdraw"}
              </Button>
            </ModalContent>
          </ModalBackground>
        )}

        {/* Booking Section */}
        {/* <BookingCard>
          {loading ? (
            <h3 style={{ textAlign: "center", color: "#555" }}>
              <Loading />
            </h3>
          ) : booking.length > 0 ? (
            <BookingList>
              {currentBookings.map((item, index) => {
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
            </BookingList>
          ) : (
            <EmptyState>
              <IconWrapper>
                <FiPackage />
              </IconWrapper>
              <EmptyTitle>No Venue record yet</EmptyTitle>
              <EmptyDescription>
                Upload your venue details to get noticed
              </EmptyDescription>
            </EmptyState>
          )} */}
           <Outlet />
        {/* </BookingCard> */}
      </Wrapper>
    </Container>

  );
};

export default DashboardHome;

const CloseIcon = styled(FiX)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #555;

  &:hover {
    color: #000;
  }
`;

const Dier = styled.div`
  width: 90%;

  .tabs {
    margin-top: 1rem;
    background: #f4f4f7;
    border-radius: 50px;
    padding: 5px;
    display: flex;
    gap: 10px;
    width: fit-content;

    .tab {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 20px;
      border-radius: 30px;
      cursor: pointer;
      transition: background 0.2s ease;
      color: #333;

      .icon {
        font-size: 1.1rem;
      }

      &:hover {
        background: #e7e7eb;
      }
    }

    .active {
      background: white;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
      font-weight: 600;
    }
  }
`;
`

@media (max-width: 480px) {
  .dier {
    width: 100%;

    .tabs {
      width: 100%;
      gap: 5px;
      padding: 3px;

      .tab {
        padding: 5px 12px;
        font-size: 0.8rem;

        .icon {
          font-size: 0.9rem;
        }
      }
    }
  }
}
`;


const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  background: #f8f9fa;
  gap: 1rem;
`;

const Wrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
`;

const DateText = styled.p`
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 32px;
  margin-top: 30px;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: white;
  width: 21%;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
  }

  
   button{
    width:30%;
    height:30px;
    background-color:#fff;
    border: 1px solid #6b467a;
    color:#000;
    border-radius:5px;

    &:hover{
      background-color:#6b467a;
      color:#fff;
      cursor:pointer;
    }
  }

  @media (max-width: 768px) {
    width: 48%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const StatTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  margin: 0;

 
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #111827;

`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background: #805c94;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const BookingCard = styled.div`
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BookingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const VenueName = styled.h3`
  font-size: 23px;
  font-weight: 600;
  color: #1e1e1e;
`;

const CustomerName = styled.p`
  font-size: 23px;
  color: #666;
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

  &:disabled {
    background-color: #c8e6c9;
    color: #666;
    cursor: not-allowed;
    opacity: 0.7;
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
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  color: #666;
`;

const EmptyTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
`;

const EmptyDescription = styled.p`
  font-size: 0.95rem;
  color: #999;
`;
