import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../assets/AuthContext/AuthContext";

const Withdraw = () => {
  const { token } = useContext(AuthContext);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWithdrawal = async () => {
      try {
        const res = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/withdrawal",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("the user withdrawal data is", res.data);

        // Store the withdrawals data in state
        setWithdrawals(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getWithdrawal();
  }, [token]);

  // Format date function with error handling
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

      const options = { year: "numeric", month: "short", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date error";
    }
  };

  // Format currency function
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "₦0";
    return `₦${amount.toLocaleString()}`;
  };

  if (loading) {
    return <Wrapper>Loading withdrawals...</Wrapper>;
  }

  return (
    <Wrapper>
      {withdrawals.length > 0 ? (
        withdrawals.map((withdrawal) => (
          <Card key={withdrawal._id}>
            <Header>
              <Amount>Amount: {formatCurrency(withdrawal.amount)}</Amount>
              <Status className="processing">Processing</Status>
            </Header>

            <BankInfo>
              <span>Bank Name: {withdrawal.bankName}</span>
              <span>Account Number: {withdrawal.accountNumber}</span>
              <span>Account Name: {withdrawal.accountName}</span>
            </BankInfo>

            {/* <Footer>
              <Date>Requested: {formatDate(withdrawal.createdAt)}</Date>
              <TransactionId>ID: {withdrawal._id}</TransactionId>
            </Footer> */}
          </Card>
        ))
      ) : (
        <div>No withdrawals found</div>
      )}
    </Wrapper>
  );
};

export default Withdraw;

// ========== STYLES BELOW ==========

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  min-height: 400px;
`;

const Card = styled.div`
  width: 97%;
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  font-family: "Inter", sans-serif;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    padding: 16px;
    width: 89%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    align-items: flex-start;
    gap: 8px;
  }
`;

const Amount = styled.h4`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: #111827;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const Status = styled.span`
  padding: 6px 14px;
  font-size: 18px;
  border-radius: 6px;
  font-weight: 500;
  text-transform: capitalize;

  &.processing {
    background-color: #fff7e6;
    color: #b76e00;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 4px 10px;
  }
`;

const BankInfo = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #4b5563;
  font-weight: 500;
  margin-top: 15px;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Footer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const Date = styled.p`
  font-size: 18px;
  color: #6b7280;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

const TransactionId = styled.span`
  font-size: 12px;
  color: #888;
  font-family: monospace;
`;

const ActionButton = styled.button`
  width: 100%;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  background: #e5e7eb;
  color: #6b7280;
  cursor: not-allowed;
  margin-top: 10px;

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 13px;
  }
`;
