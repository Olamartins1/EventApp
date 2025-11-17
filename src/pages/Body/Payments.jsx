import React, { useState } from "react";
import styled from "styled-components";
import { FaFileInvoice, FaClock, FaWallet } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";

const Container = styled.div`
  padding: 2rem;
  background-color: #fafafa;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #999;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
  transition: transform 0.2s;

  &:hover {
    transform: ${(props) => (props.clickable ? "scale(1.03)" : "none")};
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 10px;
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  background: white;
  &:focus {
    outline: none;
    border-color: #5d3fd3;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const CardLabel = styled.span`
  font-size: 0.9rem;
  color: #999;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background-color: ${(props) => props.bgColor || "#f5f5f5"};
  color: ${(props) => props.color || "#666"};

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }
`;

const Amount = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.25rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const AmountLabel = styled.div`
  font-size: 0.85rem;
  color: #999;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const EmptyState = styled.div`
  background: white;
  border-radius: 12px;
  padding: 5rem 2rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1rem;
  }
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: #666;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;

  @media (max-width: 480px) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const EmptyTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const EmptyDescription = styled.p`
  font-size: 0.875rem;
  color: #999;
  font-weight: 400;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const HeaderModal = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.1rem;
    }
  }
`;

const CloseButton = styled.button`
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #333;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #5d3fd3;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 9px 11px;
  }
`;

const Footer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: flex-end;
`;

const WithdrawButton = styled.button`
  padding: 10px 20px;
  background: transparent;
  color: #000;
  font-size: 0.95rem;
  border: 1px solid #603379;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #603379;
    color: #fff;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 9px 18px;
  }
`;

const WithdrawModal = ({ isOpen, onClose, onWithdraw }) => {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankType, setBankType] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");

  if (!isOpen) return null;

  const handleWithdraw = () => {
    if (!amount || !account || !bankName || !bankType || !accountName) {
      toast.error("Please fill in all fields");
      return;
    }
    onWithdraw({ amount, account, bankName, bankType, accountName });
    setAmount("");
    setAccount("");
    setBankName("");
    setBankType("");
    setAccountName("");
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer>
        <HeaderModal>
          <h2>Withdraw Earnings</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </HeaderModal>
        <Content>
          <Label>Amount</Label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Label>Bank Name</Label>
          <Input
            type="text"
            placeholder="Enter bank name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />

          <Label>Account Type</Label>
          <Select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="">Select account type</option>
            <option value="Savings">Savings</option>
            <option value="Fixed">Fixed</option>
            <option value="Current">Current</option>
          </Select>

          <Label>Account Name</Label>
          <Input
            type="text"
            placeholder="Enter account name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />

          <Label>Account Number / Wallet</Label>
          <Input
            type="text"
            placeholder="Enter account number"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </Content>
        <Footer>
          <WithdrawButton onClick={handleWithdraw}>Withdraw</WithdrawButton>
        </Footer>
      </ModalContainer>
    </Overlay>
  );
};

const Payment = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWithdraw = (data) => {
    console.log("Withdraw request:", data);
  };

  return (
    <Container>
      <Header>
        <Title>Payments & Earnings</Title>
        <Subtitle>
          Manage your earnings and featured hall subscriptions
        </Subtitle>
      </Header>

      <CardsGrid>
        <Card>
          <CardHeader>
            <CardLabel>Total Earnings</CardLabel>
            <IconWrapper bgColor="#efebf2" color="#0f0d11">
              <FaFileInvoice />
            </IconWrapper>
          </CardHeader>
          <Amount>₦0</Amount>
          <AmountLabel>All time</AmountLabel>
        </Card>

        <Card>
          <CardHeader>
            <CardLabel>This Month</CardLabel>
            <IconWrapper bgColor="#c2ffd5" color="#14dd50">
              <BiMoney />
            </IconWrapper>
          </CardHeader>
          <Amount>₦0</Amount>
          <AmountLabel>All time</AmountLabel>
        </Card>

        <Card>
          <CardHeader>
            <CardLabel>Pending</CardLabel>
            <IconWrapper bgColor="#fef5cc" color="#fccd0e">
              <FaClock />
            </IconWrapper>
          </CardHeader>
          <Amount>₦0</Amount>
          <AmountLabel>Processing</AmountLabel>
        </Card>

        <Card clickable onClick={() => setModalOpen(true)}>
          <CardHeader>
            <CardLabel>Available</CardLabel>
            <IconWrapper bgColor="#efebf2" color="#603379">
              <FaWallet />
            </IconWrapper>
          </CardHeader>
          <Amount>₦0</Amount>
          <AmountLabel>Ready to withdraw</AmountLabel>
        </Card>
      </CardsGrid>

      <EmptyState>
        <EmptyIcon>
          <FiPackage />
        </EmptyIcon>
        <EmptyTitle>No payments available yet</EmptyTitle>
        <EmptyDescription>
          Earnings data will appear here once transactions begin processing
        </EmptyDescription>
      </EmptyState>

      <WithdrawModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onWithdraw={handleWithdraw}
      />
    </Container>
  );
};

export default Payment;
