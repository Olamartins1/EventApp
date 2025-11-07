import styled from "styled-components";

const ApproveModal = ({ onCancel, onConfirm }) => {
  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>Verify Venue</Title>
        <Subtitle>Reason for rejecting venue</Subtitle>

        <Message>
          Are you sure you want to approve this venue? This confirms that the
          venue is valid and verified.
        </Message>

        <ButtonGroup>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <ConfirmButton onClick={onConfirm}>
            Confirm Verification
          </ConfirmButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ApproveModal;

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
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 14px;
  color: #4a4a4a;
  line-height: 1.6;
  margin: 0 0 32px 0;
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

const ConfirmButton = styled(Button)`
  background: #10b981;
  color: white;

  &:hover {
    background: #059669;
  }

  &:active {
    background: #047857;
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
  }
`;
