import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";

const Invoice = () => {
  const [invoice, setInvoice] = useState(null);
  console.log( "the invoice",invoice)

  const [loading, setLoading] = useState(false);
  // Prefer using the route param if present. Falls back to placeholder to avoid crashes.
  const params = useParams();
  const invoiceId = params.invoiceId || params.id || "YOUR_INVOICE_ID";

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://eventiq-final-project.onrender.com/api/v1/invoice/${invoiceId}`
        );
        setInvoice(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  if (loading) return <p>Loading invoice...</p>;
  if (!invoice && !loading) return <p>No invoice found</p>;

  return (
    <InvoiceContainer>
      <InvoiceCard>
        <Header>
          <div className="logo">
            <h2>Eventiq</h2>
            <p>Your Events start here</p>
          </div>
          <div className="info">
            <h3>Invoice</h3>
            <p>
              Date Issued: <span>{invoice?.dateIssued}</span>
            </p>
            <div className="status">{invoice?.status}</div>
          </div>
        </Header>

        <Section>
          <SectionTitle>
            <AiOutlineFileText /> Customer Information
          </SectionTitle>
          <div className="content">
            <p>
              <strong>Name:</strong> {invoice?.customerName}
            </p>
            <p>
              <FiMail /> {invoice?.customerEmail}
            </p>
            <p>
              <FiPhone /> {invoice?.customerPhone}
            </p>
          </div>
        </Section>

        <Section>
          <SectionTitle>
            <FiMapPin /> Venue Details
          </SectionTitle>
          <div className="venue-card">
            <div className="venue_wrapper">
              <h4>{invoice?.venueName}</h4>
              <div className="lush">
                <span>{invoice?.venueType}</span>
                <p>{invoice?.venueAddress}</p>
              </div>
              <div className="venue-info">
                <span>{invoice?.eventDate}</span>
                <span>
                  <FiClock /> {invoice?.hoursBooked} hours
                </span>
              </div>
              <article>
                <BsFillPeopleFill /> {invoice?.capacity}
              </article>
            </div>
          </div>
        </Section>

        <Section>
          <SectionTitle>
            <AiOutlineFileText /> Payment Breakdown
          </SectionTitle>
          <div className="table">
            <div className="row header">
              <span>Description</span>
              <span>Qty</span>
              <span>Price (₦)</span>
              <span>Total (₦)</span>
            </div>

            <div className="row">
              <span>{invoice?.rentalDescription}</span>
              <span>1</span>
              <span>{invoice?.venuePrice?.toLocaleString()}</span>
              <span>{invoice?.venuePrice?.toLocaleString()}</span>
            </div>

            <div className="row">
              <span>Service Fee</span>
              <span>1</span>
              <span>{invoice?.serviceFee?.toLocaleString()}</span>
              <span>{invoice?.serviceFee?.toLocaleString()}</span>
            </div>

            <div className="row">
              <span>Caution Fee</span>
              <span>1</span>
              <span>{invoice?.cautionFee?.toLocaleString()}</span>
              <span>{invoice?.cautionFee?.toLocaleString()}</span>
            </div>

            <div className="grand-total">
              <span>Grand Total</span>
              <span>₦{invoice?.totalAmount?.toLocaleString()}</span>
            </div>
          </div>
        </Section>

        <Footer>
          <p>
            Thank you for booking with Eventiq. You can download this invoice or
            view it anytime in your dashboard.
          </p>
          <button>Download Invoice (PDF)</button>
        </Footer>
      </InvoiceCard>
    </InvoiceContainer>
  );
};

export default Invoice;

const InvoiceContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f3fb;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const InvoiceCard = styled.div`
  background: white;
  width: 700px;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .logo {
    h2 {
      font-family: "Poppins", sans-serif;
      color: #7c3aed;
      margin-bottom: 4px;
    }
    p {
      color: #6b7280;
      font-size: 0.9rem;
    }
  }

  .info {
    text-align: right;
    h3 {
      font-size: 1.3rem;
      color: #111827;
      margin-bottom: 5px;
    }
    p {
      color: #6b7280;
      font-size: 0.9rem;
      span {
        color: #111827;
        font-weight: 500;
      }
    }
    .status {
      margin-top: 6px;
      background: #dcfce7;
      color: #16a34a;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
      display: inline-block;
      font-size: 0.8rem;
    }
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  .content {
    background: #f9fafb;
    padding: 1rem;
    border-radius: 10px;
    p {
      margin: 4px 0;
      color: #374151;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .venue-card {
    background: #f4edff;
    border-radius: 10px;
    padding: 1rem;

    .venue_wrapper {
      width: 70%;
      height: 100%;
      gap: 1.5rem;

      article {
        margin-top: 0.8rem;
      }

      .lush {
        font-size: 0.9rem;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      h4 {
        color: #6b21a8;
        font-size: 1.1rem;
        margin-bottom: 6px;
      }
      p {
        color: #4b5563;
        margin-bottom: 8px;
      }
      .venue-info {
        display: flex;
        gap: 4rem;
        font-size: 0.9rem;
        color: #6b7280;
        span {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }
    }
  }

  .table {
    border-radius: 10px;
    overflow: hidden;
    .row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      padding: 10px;
      font-size: 0.9rem;
      color: #374151;
      border-bottom: 1px solid #e5e7eb;

      &.header {
        background: #f3f4f6;
        font-weight: 600;
      }
    }

    .grand-total {
      display: flex;
      justify-content: space-between;
      background: #ede9fe;
      color: #6b21a8;
      font-weight: 700;
      padding: 12px 10px;
      border-radius: 0 0 10px 10px;
    }
  }
`;

const SectionTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: #6b21a8;
  font-weight: 600;
`;

const Footer = styled.div`
  text-align: center;
  border-top: 1px solid #f3f4f6;
  padding-top: 1rem;

  p {
    color: #6b7280;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  button {
    background: #6b21a8;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #581c87;
    }
  }
`;
