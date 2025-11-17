import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../assets/AuthContext/AuthContext";
import Loading from "../../../components/static/Loading/Loading";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  console.log("the booking", bookings);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
 
 const {bookkingId} = useParams()

//    const getBookingDetails = async()=>{
//   try {
//     setLoading(true);
//          const res = await axios.get(`https://eventiq-final-project.onrender.com/api/v1/paiddetail/${id}`)
//        setBookDetails(res?.data?.data)
//   } catch (error) {
//   console.log(error)  
//   } finally {
//     setLoading(false);
//   }
//     }
//  useEffect(()=>{

// getBookingDetails()
//  },[id])
  

//  useEffect(() => {
//     const getOneBookinng = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `https://eventiq-final-project.onrender.com/api/v1/get-booking/${bookingId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );



//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getOneBookinng();
//   }, [token]);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/client-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

          const sorted = [...response.data?.data].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);
setBookings(sorted);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  if (loading) {
    return <p style={{ textAlign: "center" }}><Loading /></p>;
  }

  return (
    <>
     {loading && <Loading />}
    <Bookhall>
      {bookings.length === 0 ? (
        <p style={{ textAlign: "center" }}>No bookings found</p>
      ) : (
        bookings.map((item) => (
          <BookingCard key={item._id}>
            <div className="booking-header">
              <div>
                <h3 className="venue-name">{item.venueId.venuename}</h3>
                <p className="venue-location">{item.venueLocation}</p>
              </div>


              <span
                className={`status ${
                  item.bookingstatus === "confirmed" ? "confirmed" : "pending"
                }`}
              >
                {item.bookingstatus}
              </span>
            </div>

            <div className="booking-details">
              <div className="detail">
                <span className="label">Event Date</span>
                <span className="value">{item?.date}</span>
              </div>
              <div className="detail">
                <span className="label">Event Type</span>
                <span className="value">{item.eventType}</span>
              </div>
              <div className="detail">
                <span className="label">Total Paid</span>
                <span className="value">₦{item.total}</span>
              </div>
              <div className="detail">
                {/* <span className="label">booking Paid</span>
                <span className="value">{item.bookingId}</span> */}
              </div>
            </div>

           <div className="booking-footer">
  {item.bookingstatus === "pending" ? (
    <Link to="/IndividualPayment/:id">
    {/* <button
      className="invoice-btn"
      onClick={() => handleCancelBooking(item._id)}
    >
      View Invoice
    </button> */}
    </Link>
  ) :(
    <Link to={`/IndividualPayment/${item._id}`}>
      <button className="invoice-btn"

      >
        Pay Now
      </button>
    </Link>
  )}
</div>

          </BookingCard>
        ))
      )}
    </Bookhall>
    </>
  );
};

export default MyBooking;

const Bookhall = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BookingCard = styled.div`
  border: 1px solid #c8a2ff;
  border-radius: 10px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.05);
  font-family: "Poppins", sans-serif;
  color: #222;

  .booking-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .venue-name {
      font-size: 1.05rem;
      font-weight: 600;
      margin: 0;
    }

    .venue-location {
      font-size: 0.9rem;
      color: #777;
      margin-top: 2px;
    }

    .status {
      font-size: 0.8rem;
      padding: 4px 10px;
      border-radius: 12px;
      font-weight: 500;
      text-transform: capitalize;

      &.confirmed {
        background-color: #eafbee;
        color: #0a8a28;
      }

      &.pending {
        background-color: #fff7e6;
        color: #b47b00;
      }
    }
  }

  .booking-details {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eee;
    margin-top: 15px;
    padding-top: 12px;
    flex-wrap: wrap;

    .detail {
      display: flex;
      flex-direction: column;
      min-width: 150px;
      margin-bottom: 10px;

      .label {
        font-size: 0.85rem;
        color: #666;
        margin-bottom: 3px;
      }

      .value {
        font-size: 0.9rem;
        font-weight: 500;
      }
    }
  }

  .booking-footer {
    margin-top: 15px;

    .invoice-btn {
      padding: 8px 16px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #fafafa;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
`;
