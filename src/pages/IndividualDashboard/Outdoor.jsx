import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useArea } from "../../assets/AreaContext/AreaContext";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Outdoor = () => {

  const token = localStorage.getItem("authToken");
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { selectedArea } = useArea();

  useEffect(() => {
    const fetchOutdoorVenues = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://eventiq-final-project.onrender.com/api/v1/allvenues-outdoor?city=${selectedArea}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(
          `https://eventiq-final-project.onrender.com/api/v1/allvenues-outdoor?city=${selectedArea}`
        );

        setVenues(response.data.data);
      } catch (err) {
        console.error("Error fetching outdoor venues:", err);
        setError("Failed to load outdoor venues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOutdoorVenues();
  }, [token, selectedArea]);

  if (loading) {
    return (
      <PageHolder>
        <PageTitle>Loading Outdoor Venues...</PageTitle>
      </PageHolder>
    );
  }

  if (error) {
    return (
      <PageHolder>
        <PageTitle>Error</PageTitle>
        <PageSubtitle>{error}</PageSubtitle>
      </PageHolder>
    );
  }

  return (
    <PageHolder>
      <PageHeader>
        <TitleWrapper>
          <PageTitle>Outdoor Venues in Lagos</PageTitle>
          <PageDescription>
            Open-air spaces offering a natural or scenic atmosphere
          </PageDescription>
        </TitleWrapper>
        <PageSubtitle>{venues.length} venue available</PageSubtitle>
      </PageHeader>

      <OutdoorGrid>
        {venues.length > 0 ? (
          venues.map((venue) => (
            <VenueCardStyled
              key={venue._id}
              onClick={() =>
                navigate(`/individual-dashboard/venue/${venue._id}`)
              }
            >
              <ImageContainer>
                {/* <FeaturedBadge>⭐ Featured</FeaturedBadge> */}
                <VenueImage
                  src={venue.documents.images[0].url}
                  alt={venue.venuename}
                />
              </ImageContainer>
              <VenueInfo>
                <VenueName>{venue.venuename}</VenueName>
                <VenueLocation>{venue.location.street}</VenueLocation>
                <VenueGuests>
                  {venue.capacity.minimum}-{venue.capacity.maximum} guests
                </VenueGuests>
                <VenuePrice>
                  ₦{venue.price.toLocaleString()}
                  <PriceDay>/day</PriceDay>
                </VenuePrice>
              </VenueInfo>
            </VenueCardStyled>
          ))
        ) : (
          <PageSubtitle>No outdoor venues found</PageSubtitle>
        )}
      </OutdoorGrid>
    </PageHolder>
  );
};

export default Outdoor;

// -------------------- STYLES --------------------

const PageHolder = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background-color: #f9fafb;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 1rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

const PageTitle = styled.h1`
  color: #0a0a0a;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const PageDescription = styled.span`
  color: #ff8c42;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 400;

  &:before {
    content: "—";
    margin-right: 0.5rem;
  }
`;

const PageSubtitle = styled.p`
  color: #717182;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
`;

const OutdoorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const VenueCardStyled = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  max-width: 390px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: #fbbf24;
  color: #0a0a0a;
  padding: 6px 12px;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 600;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const VenueImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const VenueInfo = styled.div`
  padding: 16px;
`;

const VenueName = styled.h3`
  color: #0a0a0a;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 6px 0;
  line-height: 1.4;
`;

const VenueLocation = styled.p`
  color: #717182;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 6px 0;
  line-height: 1.4;
`;

const VenueGuests = styled.p`
  color: #0a0a0a;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 8px 0;
`;

const VenuePrice = styled.p`
  color: #5b21b6;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  display: inline;
`;

const PriceDay = styled.span`
  color: #5b21b6;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 400;
`;
