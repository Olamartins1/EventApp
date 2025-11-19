import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { IoArrowBackOutline } from "react-icons/io5";

const Invoice = () => {
  const { invoiceId } = useParams();
  console.log(invoiceId)
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const invoiceRef = useRef(null);




  const getInvoice = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://eventiq-final-project.onrender.com/api/v1/invoice/${invoiceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInvoice(res?.data?.data);
      console.log("the invoice",res?.data?.data)
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvoice();
  }, [invoiceId]);

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Eventiq_Invoice_${invoiceId}.pdf`);
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        Loading invoice...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "red",
          fontSize: "1rem",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div>
      <InvoiceContainer ref={invoiceRef}>
        <Link to="/individual-dashboard/MyProfile">
          <IoArrowBackOutline size={20} />
        </Link>

        <div className="invoice-header">
          <div className="brand">
            <h2>Eventiq</h2>
            <p>Your Events start here</p>
          </div>
          <div className="invoice-info">
            <p>
              <strong>Date Issued:</strong> {invoice?.issuedDate}
            </p>
            <span className="status paid">
              {invoice?.venuebookingId?.paymentstatus}
            </span>
          </div>
        </div>

        <section className="section customer-info">
          <h3>
            <span className="icon">📄</span> Customer Information
          </h3>
          <div className="content-box">
            <p>
              <strong>Name:</strong> {invoice?.clientId?.firstName}
            </p>
            <p>
              <strong>Email:</strong> {invoice?.clientId?.email}
            </p>
          </div>
        </section>

        <section className="section venue-details">
          <h3>
            <span className="icon">🏛️</span> Venue Details
          </h3>
          <div className="venue-box">
            <h4>{invoice?.venueId?.name || "Lush Garden Paradise"}</h4>
            <div className="venue-meta">
              <div>
                <p>📍 {invoice?.venueId?.location?.street},
                  {invoice?.location?.city}
                </p>
                <p>📅 {invoice?.issuedDate}</p>
                <p>
                  👥 {invoice?.capacity?.minimum}–{invoice?.capacity?.maximum} guests
                </p>
              </div>
              <div>
                <p>🏞️ {invoice?.venueId?.type}</p>
                <p>⏱️ Minimum 5 hours</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section payment-breakdown">
          <h3>Payment Breakdown</h3>
          <table>
            <thead>
              <tr>
                <th>Description</th>
             
                <th>Price (₦)</th>
                <th>Total (₦)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Venue Rental</td>
         
                <td>{invoice?.venueId?.price}</td>
                <td>{invoice?.venueId?.price}</td>
              </tr>
              <tr>
                <td>VAT (7.5%)</td>
              
                <td>{invoice?.venuebookingId?.vat}</td>
                <td>{invoice?.venuebookingId?.vat}</td>
              </tr>
              <tr>
                <td>Caution Fee</td>
        
                <td>{invoice?.venueId?.cautionfee}</td>
                <td>{invoice?.venueId?.cautionfee}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="grand-total-label">
                  Grand Total
                </td>
                <td className="grand-total">
                  {invoice?.venuebookingId?.total}
                </td>
              </tr>
            </tfoot>
          </table>
        </section>

        <div className="footer">
          <p>
            Thank you for booking with Eventiq. You can download this invoice or
            view it anytime in your dashboard.
          </p>
          <button className="download-btn" onClick={handleDownloadPDF}>
            ⬇ Download Invoice (PDF)
          </button>
        </div>
      </InvoiceContainer>
    </div>
  );
};

export default Invoice;

const InvoiceContainer = styled.div`
  max-width: 700px;
  margin: 30px auto;
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  font-family: "Poppins", sans-serif;
  color: #222;

  .invoice-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2px solid #f3f3f3;
    padding-bottom: 20px;
    position: relative


    .brand {
      h2 {
        color: #6b21a8;
        font-size: 1.4rem;
        margin: 0;
      }
      p {
        font-size: 0.9rem;
        color: #777;
      }
    }

    .invoice-info {
      text-align: right;
      font-size: 0.9rem;

      p {
        margin: 2px 0;
      }

      .status {
        display: inline-block;
        margin-top: 6px;
        font-size: 0.8rem;
        padding: 3px 10px;
        border-radius: 12px;
        font-weight: 500;

        &.paid {
          background: #eafbee;
          color: #0a8a28;
        }
      }
    }
  }

  .section {
    margin-top: 25px;

    h3 {
      display: flex;
      align-items: center;
      font-size: 1rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 10px;

      .icon {
        margin-right: 6px;
      }
    }

    .content-box {
      background: #fafafa;
      padding: 15px;
      border-radius: 8px;
      p {
        font-size: 0.9rem;
        margin: 5px 0;
        color: #444;

        strong {
          color: #111;
        }
      }
    }

    &.venue-details {
      .venue-box {
        background: #f8f4ff;
        border-radius: 8px;
        padding: 15px;

        h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #5b21b6;
          margin-bottom: 8px;
        }

        .venue-meta {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          p {
            font-size: 0.9rem;
            color: #555;
            margin: 3px 0;
          }
        }
      }
    }

    &.payment-breakdown {
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
        margin-top: 10px;

        th {
          
          text-align: left;
          color: #555;
          padding: 8px 0;
          border-bottom: 1px solid #eee;

        }

        td {
          padding: 8px;
          color: #444;
        }

      tfoot {
  .grand-total-label {
    font-weight: 600;
    color: #333;
    width: 70%;
  
  }

  .grand-total {
    font-weight: 700;
    color: #5b21b6;
    background: #f3e8ff;
    border-radius: 6px;
  }
}

        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 30px;

    p {
      font-size: 0.85rem;
      color: #555;
      margin-bottom: 10px;
    }

    .download-btn {
      background: #5b21b6;
      
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background: #4c1d95;
      }
    }
  }

  /* 📱 MOBILE RESPONSIVENESS */
  @media (max-width: 768px) {
    padding: 20px;

    .invoice-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;

      .invoice-info {
        text-align: left;
      }
    }

    .section {
      h3 {
        font-size: 0.95rem;
      }

      .content-box,
      .venue-box {
        padding: 12px;
      }

      &.venue-details {
        .venue-box {
          .venue-meta {
            flex-direction: column;
            gap: 8px;
          }
        }
      }

      &.payment-breakdown {
        table {
          font-size: 0.85rem;

          th,
          td {
            padding: 6px 0;
          }
        }
      }
    }

    .footer {
      p {
        font-size: 0.8rem;
      }

      .download-btn {
        width: 100%;
        font-size: 0.85rem;
      }
    }
  }
`;
