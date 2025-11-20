import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FiPackage } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
// import Loading from "../../components/static/Loading/Loading";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
import Loading from "../../components/static/Loading/Loading";

const OwnerBookings = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const [showAcceptPopup, setShowAcceptPopup] = useState(false);   // NEW
  const [selectedBookingId, setSelectedBookingId] = useState(null); // NEW

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [acceptLoading, setAcceptLoading] = useState(false);


  const sortedBookings = [...booking].sort((a, b) => {
    if (a.bookingstatus === "pending" && b.bookingstatus !== "pending") return -1;
    if (a.bookingstatus !== "pending" && b.bookingstatus === "pending") return 1;
    return new Date(b.date) - new Date(a.date);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = sortedBookings.slice(indexOfFirstItem, indexOfLastItem);

  // ✔ CALL ACCEPT API ONLY AFTER POPUP CONFIRMATION
  const confirmAccept = async () => {
    try {
      setAcceptLoading(true);
      await axios.get(
        `https://eventiq-final-project.onrender.com/api/v1/acceptbooking/${selectedBookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowAcceptPopup(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }finally {
      setAcceptLoading(false);
    }
  };

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
    <>
    {/* <Loading /> */}
    <Container>
      {showAcceptPopup && (
        <PopupOverlay>
          <PopupBox>
            <PopupTitle>Confirm Booking Acceptance</PopupTitle>
            <PopupText>Are you sure you want to accept this booking?</PopupText>

            <PopupButtons>
              <ConfirmBtn onClick={confirmAccept}>   {acceptLoading ? <Loading /> : " Accept"}</ConfirmBtn>
              <CancelBtn onClick={() => setShowAcceptPopup(false)}>Cancel</CancelBtn>
            </PopupButtons>
          </PopupBox>
        </PopupOverlay>
      )}

      {loading ? (
        <LoadingWrapper>
          {/* <Loading /> */}
        </LoadingWrapper>
      ) : booking.length > 0 ? (
        <BookingList>
          {currentBookings.map((item) => {
            const isPending = item.bookingstatus === "pending";
            return (
              <Card key={item._id}>
                <VenueName>{item.venueId.venuename}</VenueName>
                <CustomerInfo>
                  <CustomerName>{item.clientId.firstName}</CustomerName>
                  <CustomerName>{item.clientId.surname}</CustomerName>
                  <GoDotFill className="move" />
                  <CustomerName>
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </CustomerName>
                </CustomerInfo>
                <Occasion>{item.eventType}</Occasion>
                <Price>₦{item.venueId.price}</Price>
                <Actions>
                  
                  <AcceptButton
                    disabled={!isPending}
                    onClick={() => {
                      setSelectedBookingId(item._id);
                      setShowAcceptPopup(true);
                    }}
                  >
                    {isPending ? "Accept" : "Accepted"}
                  </AcceptButton>

                  {isPending && (
                    <RejectButton
                      onClick={() => {
                        setDeleteid(item._id);
                        setShowPopup(true);
                      }}
                    >
                      Reject
                    </RejectButton>
                  )}
                </Actions>
              </Card>
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
    </Container>
    </>
  );
};

export default OwnerBookings;



const Container = styled.div`
  width: 100%;
`;

const LoadingWrapper = styled.div`
  text-align: center;
  color: #555;
`;

const BookingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  
`;

const Card = styled.div`
  background: #fff;
  height: 5%;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;


  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }

  @media (max-width: 375px) {
    padding: 10px;
  }
`;

const VenueName = styled.h3`
  font-size: 23px;
  font-weight: 600;
  color: #1e1e1e;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }

  @media (max-width: 375px) {
    font-size: 16px;
  }
`;

const CustomerInfo = styled.div`
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  margin-top: 5px;

  .move{
  margin-top: 2rem;


  @media (max-width: 480px) {
     margin-top: 1.5rem;
  }

  @media (max-width: 375px) {
   
  }
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
  }

  @media (max-width: 375px) {
    font-size: 16px;
  }
`;

const Occasion = styled.p`
  font-size: 18px;
  margin-top: -17px;
  color: #999;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-top: -12px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-top: -10px;
  }

  @media (max-width: 375px) {
    font-size: 13px;
    margin-top: -5px;
  }
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #805c94;
  margin-top: -15px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-top: -12px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-top: -10px;
  }

  @media (max-width: 375px) {
    font-size: 14px;
    margin-top: -5px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 10px;
  flex-wrap: wrap;
  margin-top: -2.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  @media (max-width: 480px) {
  margin-top: 0.1rem;
    gap: 6px;
  }

  @media (max-width: 375px) {
    gap: 5px;
  }
`;

const AcceptButton = styled.button`
  background: #00c853;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  padding: 10px 30px;
  cursor: pointer;
  width: auto;

  &:disabled {
    background-color: #c8e6c9;
    color: #666;
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 20px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 13px;
  }

  @media (max-width: 375px) {
    padding: 6px 12px;
    font-size: 12px;
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
  margin-right: 25px;
  width: auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 20px;
    margin-right: 0;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 13px;
  }

  @media (max-width: 375px) {
    padding: 6px 12px;
    font-size: 12px;
  }
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

  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const EmptyTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const EmptyDescription = styled.p`
  font-size: 0.95rem;
  color: #999;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 30px; 
`;

const PopupBox = styled.div`
  background: white;
  padding: 25px 20px;
  width: 100%;
  max-width: 380px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);

  @media (max-width: 480px) {
    padding: 20px 15px;
    max-width: 320px;
  }
`;

const PopupTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const PopupText = styled.p`
  font-size: 16px;
  margin-bottom: 25px;
  color: #333;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const PopupButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const ConfirmBtn = styled.button`
  background: #0a8346;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
  font-size: 15px;
  font-weight: 500;

  &:hover {
    background: #066d39;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const CancelBtn = styled.button`
  background: #d9534f;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
  font-size: 15px;
  font-weight: 500;

  &:hover {
    background: #b7433f;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px;
  }
`;
