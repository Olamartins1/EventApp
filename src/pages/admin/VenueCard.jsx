// import React from "react";
import styled from "styled-components";
import { Eye, Check, X, Star } from "lucide-react";
import ViewDetailsModal from "./ViewDetailsModal";
import ApproveModal from "./ApproveModal";
import RejectModal from "./RejectModal";
import React, { useState } from "react";

const VenueCard = ({ venue }) => {
  const [showModal, setShowModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleConfirmApproval = () => {
    console.log(`Venue "${venue.name}" approved ✅`);
    setShowApproveModal(false);
    // Optionally: call your API here to mark the venue as approved
  };

  const handleRejectSubmit = (reason) => {
    console.log(`Venue "${venue.name}" rejected ❌. Reason: ${reason}`);
    setShowRejectModal(false);
    // Optionally: call your API here to record the rejection reason
  };
  return (
    <VenueContainer>
      <VenueCardContainer>
        <CardContent>
          <ImageWrapper>
            <VenueImage src={venue.image} alt={venue.name} />
            {venue.verified && <VerifiedBadge>Verified</VerifiedBadge>}
            {venue.featured && <FeaturedIcon />}
          </ImageWrapper>

          <DetailsWrapper>
            <DetailsHeader>
              <DetailsInfo>
                <VenueName>{venue.name}</VenueName>
                <Location>{venue.location}</Location>
                <Capacity>
                  <span>Capacity:</span> {venue.capacity}
                </Capacity>
              </DetailsInfo>
            </DetailsHeader>

            <PriceInfo>
              <InfoBlock>
                <InfoLabel>Price/Day</InfoLabel>
                <InfoValue $bold>₦{venue.price.toLocaleString()}</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Submitted</InfoLabel>
                <InfoValue>{venue.date}</InfoValue>
              </InfoBlock>
            </PriceInfo>
          </DetailsWrapper>

          <ActionButtons>
            <ViewDetailsButton onClick={() => setShowModal(true)}>
              <Eye className="w-4 h-4" />
              View Details
            </ViewDetailsButton>

            <Approve_Reject>
              <ApproveButton onClick={() => setShowApproveModal(true)}>
                <Check className="w-4 h-4" />
                Approve
              </ApproveButton>
              <RejectButton onClick={() => setShowRejectModal(true)}>
                <X className="w-4 h-4" />
                Reject
              </RejectButton>
            </Approve_Reject>
          </ActionButtons>
        </CardContent>
      </VenueCardContainer>
      {showModal && <ViewDetailsModal onClose={() => setShowModal(false)} />}
      {showApproveModal && (
        <ApproveModal
          onCancel={() => setShowApproveModal(false)}
          onConfirm={handleConfirmApproval}
        />
      )}
      {showRejectModal && (
        <RejectModal
          onCancel={() => setShowRejectModal(false)}
          onSubmit={handleRejectSubmit}
        />
      )}
    </VenueContainer>
  );
};

export default VenueCard;

const VenueContainer = styled.div`
  // background-color: #efebf2;
`;

const VenueCardContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.2s;
  width: 1020px;
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

const CardContent = styled.div`
  display: flex;
  gap: 2rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const VenueImage = styled.img`
  width: 7rem;
  height: 7rem;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const VerifiedBadge = styled.span`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background-color: #10b981;
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`;

const FeaturedIcon = styled(Star)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  color: #eab308;
  fill: #eab308;
`;

const DetailsWrapper = styled.div`
  flex: 1;
  gap: 4rem;
  min-width: 0;
  display: flex;
`;

const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.5rem;
`;

const DetailsInfo = styled.div``;

const VenueName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`;

const Location = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
`;

const Capacity = styled.p`
  font-size: 0.875rem;
  color: #374151;

  span {
    font-weight: 500;
  }
`;

const ViewDetailsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 250px;

  &:hover {
    background-color: #f9fafb;
  }
`;

const PriceInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 0.75rem;
`;

const InfoBlock = styled.div``;

const InfoLabel = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.p`
  font-size: 0.875rem;
  font-weight: ${(props) => (props.$bold ? "600" : "500")};
  color: ${(props) => (props.$bold ? "#111827" : "#374151")};
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const Approve_Reject = styled.div`
  display: flex;
  gap: 2rem;
`;

const ApproveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #059669;
  }
`;

const RejectButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  color: #ef4444;
  border: 1px solid #ef4444;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fef2f2;
  }
`;
