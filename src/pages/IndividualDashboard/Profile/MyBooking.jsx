import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../assets/AuthContext/AuthContext";
import Loading from "../../../components/static/Loading/Loading";

const MyBooking = () => {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings
  useEffect(() => {
    const fetchBookingsAndInvoices = async () => {
      try {
        setLoading(true);

        // Fetch bookings
        const bookingsResponse = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/client-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Bookings API Response:", bookingsResponse.data);

        // Fetch invoices
        const invoiceResponse = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/invoices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Invoices API Response:", invoiceResponse.data);

        // Sort bookings by most recent
        const sortedBookings = [...bookingsResponse.data.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        console.log("Sorted Bookings:", sortedBookings);

        // Create a map of invoices by booking ID
        const invoiceMap = {};
        invoiceResponse.data.data.forEach((invoice) => {
          // The invoice has venuebookingId._id which is the booking ID
          if (invoice.venuebookingId && invoice.venuebookingId._id) {
            invoiceMap[invoice.venuebookingId._id] = invoice;
          }
        });

        console.log("Invoice Map:", invoiceMap);

        // Attach invoice to each booking
        const bookingsWithInvoices = sortedBookings.map((booking) => ({
          ...booking,
          invoice: invoiceMap[booking._id] || null,
        }));

        console.log("Final Bookings with Invoices:", bookingsWithInvoices);

        setBookings(bookingsWithInvoices);
      } catch (error) {
        console.error("Error fetching bookings and invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingsAndInvoices();
  }, [token]);

  if (loading) {
    return (
      <p style={{ textAlign: "center" }}>
        <Loading />
      </p>
    );
  }

  return (
    <Bookhall>
      {bookings.length === 0 ? (
        <p style={{ textAlign: "center" }}>No bookings found</p>
      ) : (
        bookings.map((item) => (
          <BookingCard key={item._id}>
            <div className="booking-header">
              <div>
                <h3 className="venue-name">{item.venueId?.venuename || "Venue Name Not Available"}</h3>
                <p className="venue-location">
                  {item.venueLocation || 
                   (item.venueId?.location ? 
                    `${item.venueId.location.street}, ${item.venueId.location.city}, ${item.venueId.location.state}` 
                    : "Location not available")}
                </p>
              </div>
<div className="status-row">
  <p className="label">Booking Status:</p>

  <span
    className={`status ${
      item.bookingstatus === "confirmed" ? "confirmed" : "pending"
    }`}
  >
    {item.bookingstatus}
  </span>
</div>

            </div>

            <div className="booking-details">
              <div className="detail">
                <span className="label">Event Date</span>
                <span className="value">{item?.date || "Date not available"}</span>
              </div>
              <div className="detail">
                <span className="label">Event Type</span>
                <span className="value">{item.eventType || "Not specified"}</span>
              </div>
              <div className="detail">
                <span className="label"> Fee</span>
                <span className="value">₦{item.total || 0}</span>
              </div>
              <div className="detail">
                <span className="label">Payment Status</span>
                <span className="value" style={{ 
                  color: item.paymentstatus === 'paid' ? 'green' : 'orange',
                  fontWeight: 'bold'
                }}>
                  {item.paymentstatus || "pending"}
                </span>
              </div>
            </div>

            <div className="booking-footer">
              <div className="booking-footer">
              {item.bookingstatus !== "pending" && (
                <>
                  {item.paymentstatus === "paid" && item.invoice ? (
                    <Link to={`/Invoice/${item.invoice._id}`}>
                      <button className="invoice-btn">View Invoice</button>
                    </Link>
                  ) : item.paymentstatus === "paid" && !item.invoice ? (
                    <button className="invoice-btn" disabled>
                      Invoice Not Available
                    </button>
                  ) : (
                    <Link to={`/IndividualPayment/${item._id}`}>
                      <button className="invoice-btn">Pay Now</button>
                    </Link>
                  )}
                </>
              )}
            </div>
            </div>
          </BookingCard>
        ))
      )}
    </Bookhall>
  );
};

export default MyBooking;


const Bookhall = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BookingCard = styled.div`
  border: 1px solid #c8a2ff;
  margin-top: 1rem;
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

      &:hover:not(:disabled) {
        background: #f0f0f0;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
`;