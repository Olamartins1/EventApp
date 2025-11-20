// import React from "react";
import styled from "styled-components";
import { Eye, Check, X, Star } from "lucide-react";
import ViewDetailsModal from "./ViewDetailsModal";
import ApproveModal from "./ApproveModal";
import RejectModal from "./RejectModal";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VenueCard = ({ venue, onStatusChange }) => {
  // const [showModal, setShowModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmApproval = () => {
    console.log(`Venue "${venue.name}" approved ✅`);
    setShowApproveModal(false);
    // Optionally: call your API here to mark the venue as approved
  };

  const handleRejectClick = (venue) => {
    setSelectedVenue(venue);
    setShowRejectModal(true);
    // Optionally: call your API here to record the rejection reason
  };

  const handleViewDetails = (venue) => {
    setSelectedVenue(venue);
    setIsModalOpen(true);
  };

  // const handleApprove = async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://eventiq-final-project.onrender.com/api/v1/venue-verifiy/652e8b7f4c1234567890abcd",

  //       {
  //         headers: {
  //           Accept: "application/json",
  //           // Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     alert("Venue approved successfully!");
  //     setShowApproveModal(false);

  //     // Notify parent to refresh list
  //     if (onStatusChange) {
  //       onStatusChange();
  //     }
  //   } catch (error) {
  //     console.error("Approve failed:", error);
  //     alert("Failed to approve venue");
  //   }
  // };

  // const handleReject = async () => {
  //   try {
  //     const res = await axios.post(
  //       "https://eventiq-final-project.onrender.com/api/v1/venue-unverified/652e8b7f4c1234567890abcd",
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           // Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     alert("Venue rejected successfully!");
  //     setShowRejectModal(false);

  //     // Notify parent to refresh list
  //     if (onStatusChange) {
  //       onStatusChange();
  //     }
  //   } catch (error) {
  //     console.error("Reject failed:", error);
  //     alert("Failed to reject venue");
  //   }
  // };

  // Suppose you store the token in localStorage after login
  // const token = localStorage.getItem("token");

  // const handleApprove = async (venue) => {
  //   try {
  //     const res = await axios.get(
  //         `https://eventiq-final-project.onrender.com/api/v1/venue-verifiy/${venue._id}`,

  //       {
  //         headers: {
  //           Accept: "application/json",

  //         },
  //       }
  //     );

  //     alert("Venue approved successfully!");
  //     setShowApproveModal(false);

  //     if (onStatusChange) onStatusChange();
  //   } catch (error) {
  //     console.error("Approve failed:", error.response || error);
  //     alert("Failed to approve venue");
  //   }
  // };

  // const handleReject = async (venue, reason) => {
  //   try {
  //     const res = await axios.post(

  //       `https://eventiq-final-project.onrender.com/api/v1/venue-unverified/${venue.id}`,

  //       {

  //         reason: reason || "Not suitable",
  //       },
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     alert("Venue rejected successfully!");
  //     setShowRejectModal(false);

  //     if (onStatusChange) onStatusChange();
  //   } catch (error) {
  //     console.error("Reject failed:", error.response || error);
  //     alert("Failed to reject venue");
  //   }
  // };

  // const token = localStorage.getItem("token"); // Auth token from localStorage

  // const handleApprove = async (venue) => {
  //   try {
  //     const res = await axios.get(
  //       `https://eventiq-final-project.onrender.com/api/v1/venue-verifiy/${venue._id}`,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${token}`, // Include token
  //         },
  //       }
  //     );

  //     alert("Venue approved successfully!");
  //     setShowApproveModal(false);

  //     if (onStatusChange) onStatusChange();
  //   } catch (error) {
  //     console.error("Approve failed:", error.response || error);
  //     alert("Failed to approve venue");
  //   }
  // };

  // const handleReject = async (venue, reason) => {
  //   try {
  //     const res = await axios.post(
  //       `https://eventiq-final-project.onrender.com/api/v1/venue-unverified/${venue._id}`,
  //       {
  //         reason: reason || "Not suitable", // POST body
  //       },
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`, // Include token
  //         },
  //       }
  //     );

  //     alert("Venue rejected successfully!");
  //     setShowRejectModal(false);

  //     if (onStatusChange) onStatusChange();
  //   } catch (error) {
  //     console.error("Reject failed:", error.response || error);
  //     alert("Failed to reject venue");
  //   }
  // };

  const token = localStorage.getItem("token");

  // const handleApprove = async (venue) => {
  //   try {
  //     const res = await axios.get(
  //       `https://eventiq-final-project.onrender.com/api/v1/venue-verifiy/${venue.raw._id}`,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Approved response:", res.data);
  //     alert("Venue approved successfully!");
  //   } catch (err) {
  //     console.error("Approve failed:", err.response || err);
  //     alert("Failed to approve venue");
  //   }
  // };

  const handleApprove = async (venue) => {
    try {
      const res = await axios.get(
        `https://eventiq-final-project.onrender.com/api/v1/venue-verifiy/${venue.raw._id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Venue approved successfully!");

      // if (onStatusChange)

      // onStatusChange();
    } catch (err) {
      console.error("Approve failed:", err.response || err);
      toast.error("Failed to approve venue");
    }
  };

  // const handleReject = async (venue, reason = "Not suitable") => {
  //   try {
  //     const res = await axios.post(
  //       `https://eventiq-final-project.onrender.com/api/v1/venue-unverified/${venue.raw._id}`,
  //       { reason },
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Rejected response:", res.data);
  //     alert("Venue rejected successfully!");
  //   } catch (err) {
  //     console.error("Reject failed:", err.response || err);
  //     alert("Failed to reject venue");
  //   }
  // };

  // const handleRejectSubmit = async (reason) => {
  //   try {
  //     const res = await axios.post(
  //       `https://eventiq-final-project.onrender.com/api/v1/venue-unverified/${selectedVenue.raw._id}`,
  //       { reason },
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Rejected response:", res.data);
  //     alert("Venue rejected successfully!");
  //     setShowRejectModal(false);
  //     setSelectedVenue(null);

  //     if (onStatusChange) onStatusChange();
  //   } catch (err) {
  //     console.error("Reject failed:", err.response || err);
  //     alert("Failed to reject venue");
  //   }
  // };

  const handleRejectSubmit = async (reason) => {
    try {
      const res = await axios.post(
        `https://eventiq-final-project.onrender.com/api/v1/venue-unverified/${selectedVenue.raw._id}`,
        { reason },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Venue rejected successfully!");

      setShowRejectModal(false);
      setSelectedVenue(null);
      // if (onStatusChange)

      // onStatusChange();
    } catch (err) {
      console.error("Reject failed:", err.response || err);
      toast.error("Failed to reject venue");
    }
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
                <VenueName>{venue.raw.venuename}</VenueName>
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
            <ViewDetailsButton onClick={() => handleViewDetails(venue)}>
              <Eye className="w-4 h-4" />
              View Details
            </ViewDetailsButton>

            <Approve_Reject>
              {/* <ApproveButton onClick={() => setShowApproveModal(true)}> */}
              <ApproveButton onClick={() => handleApprove(venue)}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_4063_3181)">
                    <path
                      d="M14.534 6.66764C14.8385 8.16183 14.6215 9.71525 13.9192 11.0688C13.217 12.4224 12.0719 13.4943 10.675 14.1058C9.2781 14.7174 7.71376 14.8315 6.24287 14.4292C4.77199 14.0269 3.48347 13.1326 2.59219 11.8952C1.70091 10.6579 1.26075 9.15246 1.34511 7.62989C1.42948 6.10733 2.03326 4.6597 3.05577 3.52842C4.07829 2.39714 5.45773 1.65059 6.96405 1.41327C8.47037 1.17595 10.0125 1.46221 11.3333 2.2243"
                      stroke="white"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 7.33268L8 9.33268L14.6667 2.66602"
                      stroke="white"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4063_3181">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Approve
              </ApproveButton>

              {/* <RejectButton onClick={() => handleReject(venue, "Not suitable")}> */}
              <RejectButton onClick={() => handleRejectClick(venue)}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_4063_3232)">
                    <path
                      d="M7.99998 14.6673C11.6819 14.6673 14.6666 11.6825 14.6666 8.00065C14.6666 4.31875 11.6819 1.33398 7.99998 1.33398C4.31808 1.33398 1.33331 4.31875 1.33331 8.00065C1.33331 11.6825 4.31808 14.6673 7.99998 14.6673Z"
                      stroke="#E7000B"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 6L6 10"
                      stroke="#E7000B"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 6L10 10"
                      stroke="#E7000B"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4063_3232">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Reject
              </RejectButton>
            </Approve_Reject>
          </ActionButtons>
        </CardContent>
      </VenueCardContainer>
      {/* {showModal && <ViewDetailsModal onClose={() => setShowModal(false)} />} */}

      {isModalOpen && (
        <ViewDetailsModal
          venue={selectedVenue}
          onClose={() => setIsModalOpen(false)}
        />
      )}
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

// const VenueContainer = styled.div`
//   // background-color: #efebf2;
// `;

// const VenueCardContainer = styled.div`
//   background-color: white;
//   border-radius: 0.5rem;
//   box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//   border: 1px solid #e5e7eb;
//   padding: 1rem;
//   margin-bottom: 1rem;
//   transition: box-shadow 0.2s;
//   width: 1020px;
//   &:hover {
//     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//   }
// `;

// const CardContent = styled.div`
//   display: flex;
//   gap: 2rem;
// `;

// const ImageWrapper = styled.div`
//   position: relative;
//   flex-shrink: 0;
// `;

// const VenueImage = styled.img`
//   width: 12rem;
//   height: 8rem;
//   object-fit: cover;
//   border-radius: 0.5rem;
// `;

// const VerifiedBadge = styled.span`
//   position: absolute;
//   top: 0.5rem;
//   left: 0.5rem;
//   background-color: #10b981;
//   color: white;
//   font-size: 0.75rem;
//   padding: 0.25rem 0.5rem;
//   border-radius: 9999px;
// `;

// const FeaturedIcon = styled(Star)`
//   position: absolute;
//   top: 0.5rem;
//   right: 0.5rem;
//   width: 1.25rem;
//   height: 1.25rem;
//   color: #eab308;
//   fill: #eab308;
// `;

// const DetailsWrapper = styled.div`
//   flex: 1;
//   gap: 4rem;
//   min-width: 0;
//   display: flex;
// `;

// const DetailsHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: start;
//   margin-bottom: 0.5rem;
// `;

// const DetailsInfo = styled.div``;

// const VenueName = styled.h3`
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: #111827;
//   margin-bottom: 0.25rem;
// `;

// const Location = styled.p`
//   font-size: 0.875rem;
//   color: #4b5563;
//   margin-bottom: 0.5rem;
// `;

// const Capacity = styled.p`
//   font-size: 0.875rem;
//   color: #374151;

//   span {
//     font-weight: 500;
//   }
// `;

// const ViewDetailsButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 2rem;
//   padding: 0.5rem 1rem;
//   border: 1px solid #572e6e;
//   border-radius: 0.5rem;
//   font-size: 14px;
//   font-weight: 500;
//   color: #572e6e;
//   background-color: white;
//   cursor: pointer;
//   transition: background-color 0.2s;
//   width: 201px;
//   height: 32px;

//   &:hover {
//     background-color: #f9fafb;
//   }
// `;

// const PriceInfo = styled.div`
//   display: flex;
//   gap: 2rem;
//   margin-top: 0.75rem;
// `;

// const InfoBlock = styled.div``;

// const InfoLabel = styled.p`
//   font-size: 0.75rem;
//   color: #6b7280;
//   margin-bottom: 0.25rem;
// `;

// const InfoValue = styled.p`
//   font-size: 0.875rem;
//   font-weight: ${(props) => (props.$bold ? "600" : "500")};
//   color: ${(props) => (props.$bold ? "#603379" : "#374151")};
// `;

// const ActionButtons = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   flex-shrink: 0;
// `;

// const Approve_Reject = styled.div`
//   display: flex;
//   gap: 0.5rem;
// `;

// const ApproveButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem 1rem;
//   background-color: #00b235;
//   color: white;
//   border: none;
//   border-radius: 0.5rem;
//   font-size: 0.875rem;
//   font-weight: 500;
//   cursor: pointer;
//   transition: background-color 0.2s;
//   width: 98px;
//   height: 32px;

//   &:hover {
//     background-color: #059669;
//   }
// `;

// const RejectButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem 1rem;
//   background-color: white;
//   color: #e7000b;
//   border: 1px solid #ffa2a2;
//   border-radius: 0.5rem;
//   font-size: 0.875rem;
//   font-weight: 500;
//   cursor: pointer;
//   transition: background-color 0.2s;
//   width: 98px;
//   height: 32px;

//   &:hover {
//     background-color: #fef2f2;
//   }
// `;

const VenueContainer = styled.div``;

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

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const CardContent = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const VenueImage = styled.img`
  width: 12rem;
  height: 8rem;
  object-fit: cover;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
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
  display: flex;
  flex-direction: row;
  gap: 2rem;
  min-width: 0;
`;

const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.5rem;
`;

const PriceInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
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
  color: ${(props) => (props.$bold ? "#603379" : "#374151")};
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

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;

  @media (max-width: 480px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const Approve_Reject = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: row;
    gap: 0.5rem;
  }
`;

const ViewDetailsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #572e6e;
  border-radius: 0.5rem;
  font-size: 14px;
  font-weight: 500;
  color: #572e6e;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 201px;
  height: 32px;

  &:hover {
    background-color: #f9fafb;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ApproveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #00b235;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 98px;
  height: 32px;

  &:hover {
    background-color: #059669;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const RejectButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  color: #e7000b;
  border: 1px solid #ffa2a2;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 98px;
  height: 32px;

  &:hover {
    background-color: #fef2f2;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
