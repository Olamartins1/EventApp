import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FiPackage } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import Loading from "../../components/static/Loading/Loading";
import { AuthContext } from "../../assets/AuthContext/AuthContext";

const OwnerBookings = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const [deleteid, setDeleteid] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // PAGINATION
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sort bookings: pending first, then by date (newest first)
  const sortedBookings = [...booking].sort((a, b) => {
    // If one is pending and the other isn't, pending comes first
    if (a.bookingstatus === "pending" && b.bookingstatus !== "pending") return -1;
    if (a.bookingstatus !== "pending" && b.bookingstatus === "pending") return 1;
    
    // If both have same status, sort by date (newest first)
    return new Date(b.date) - new Date(a.date);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = sortedBookings.slice(indexOfFirstItem, indexOfLastItem);

  // ACCEPT BOOKING
  const acceptBooking = async (id) => {
    try {
      await axios.get(
        `https://eventiq-final-project.onrender.com/api/v1/acceptbooking/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
window.location.reload()
      // refresh after accept
      // setTimeout(() => window.location.reload(), 0);
    } catch (err) {
      console.log(err);
    }
  };

  // FETCH BOOKINGS
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

  return (
     <BookingCard>
    <Wrapper>
     
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
                        onClick={() => acceptBooking(item._id)}
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
        )}
      
    </Wrapper>
    </BookingCard>
  );
};

export default OwnerBookings;

// 🎨 STYLES (unchanged)
const BookingCard = styled.div`
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  width: 100%;
  height: 50%;
`;

const Wrapper = styled.div``;

const BookingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
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
  margin-bottom: 10px;
  margin-right: 25px;

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
  margin-bottom: 10px;
  margin-right: 25px;
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