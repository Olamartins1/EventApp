import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const All_venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/allvenues",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVenues(response.data.data);
      } catch (err) {
        console.error("Error fetching venues:", err);
        setError(
          "Failed to load venues. Please check your network or try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <PageTitle>Loading Venues...</PageTitle>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <PageTitle>Error</PageTitle>
        <PageSubtitle>{error}</PageSubtitle>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Event Venues in Lagos</PageTitle>
        <PageSubtitle>{venues.length} venues available</PageSubtitle>
      </PageHeader>

      <VenuesGrid>
        {venues.length > 0 ? (
          venues.map((venue, index) => (
            <VenueCard
              key={venue._id}
              onClick={() =>
                navigate(`/individual-dashboard/venue/${venue._id}`)
              }
            >
              <ImageWrapper>
                <VenueImage
                  src={venue.documents.images[0].url}
                  alt={venue.venuename}
                />
                {/* {index < 4 && <FeaturedBadge>⭐ Featured</FeaturedBadge>} */}
              </ImageWrapper>

              <CardContent>
                <VenueName>{venue.venuename}</VenueName>
                <Location>{venue.location.street}, Lagos</Location>
                <Capacity>
                  {venue.capacity.minimum}-{venue.capacity.maximum} guests
                </Capacity>
                <Price>
                  ₦{venue.price.toLocaleString()}
                  <PriceUnit>/day</PriceUnit>
                </Price>
              </CardContent>
            </VenueCard>
          ))
        ) : (
          <PageSubtitle>No venues found</PageSubtitle>
        )}
      </VenuesGrid>
    </PageContainer>
  );
};

export default All_venues;

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 3rem;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 1rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: #0a0a0a;
  font-family: Poppins, sans-serif;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  color: #717182;
  font-family: Poppins, sans-serif;
  font-size: 16px;
`;

const VenuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const VenueCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
`;

const VenueImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: #ff9800;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-family: Poppins, sans-serif;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CardContent = styled.div`
  padding: 16px 18px 20px 18px;
`;

const VenueName = styled.h3`
  color: #0a0a0a;
  font-family: Poppins, sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 6px 0;
  line-height: 1.3;
`;

const Location = styled.p`
  color: #717182;
  font-family: Poppins, sans-serif;
  font-size: 13px;
  margin: 0 0 4px 0;
  line-height: 1.4;
`;

const Capacity = styled.p`
  color: #717182;
  font-family: Poppins, sans-serif;
  font-size: 13px;
  margin: 0 0 12px 0;
  line-height: 1.4;
`;

const Price = styled.p`
  color: #5d3a8f;
  font-family: Poppins, sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
`;

const PriceUnit = styled.span`
  color: #0a0a0a;
  font-size: 13px;
  font-weight: 400;
`;
