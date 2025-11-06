import styled from "styled-components";
import { useState } from "react";
const RejectModal = ({ onCancel, onSubmit }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason);
    }
  };

  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>Unverify Venue</Title>
        <Subtitle>Reason for rejecting venue</Subtitle>

        <TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason for rejection..."
        />

        <ButtonGroup>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <SubmitButton onClick={handleSubmit} disabled={!reason.trim()}>
            Submit Rejection
          </SubmitButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default RejectModal;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 520px;
  padding: 32px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  font-size: 14px;
  font-family: inherit;
  color: #1a1a1a;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  resize: vertical;
  margin-bottom: 24px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

const CancelButton = styled(Button)`
  background: white;
  color: #4a4a4a;
  border: 1px solid #d1d5db;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }

  &:active {
    background: #f3f4f6;
  }
`;

const SubmitButton = styled(Button)`
  background: #ef4444;
  color: white;

  &:hover {
    background: #dc2626;
  }

  &:active {
    background: #b91c1c;
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
  }

  &:disabled {
    background: #fca5a5;
    cursor: not-allowed;
  }
`;
