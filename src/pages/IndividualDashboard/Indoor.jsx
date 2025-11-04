import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import VenueCard from "../../components/VenueCard";
import {useArea} from "../../assets/AreaContext/AreaContext";
import { useNavigate } from "react-router-dom";

const Indoor = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const token = localStorage.getItem("authToken");
  const {selectedArea}= useArea()
  
  useEffect(() => {
    const fetchIndoorVenues = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://eventiq-final-project.onrender.com/api/v1/allvenues-indoor?city=${selectedArea}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(`https://eventiq-final-project.onrender.com/api/v1/allvenues-indoor?city=${selectedArea}`)
        
        setVenues(response.data.data);
      } catch (err) {
        console.error("Error fetching indoor venues:", err);
        setError("Failed to load indoor venues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIndoorVenues();
  }, [token, selectedArea]);

  if (loading) {
    return (
      <PageHolder>
        <PageTitle>Loading Indoor Venues...</PageTitle>
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
        <PageTitle>Indoor Halls in {selectedArea || "Lagos"}</PageTitle>
        <PageSubtitle>{venues.length} venues available</PageSubtitle>
      </PageHeader>

      <IndoorGrid>
        {venues.length > 0 ? (
          venues.map((venue) => (
            <VenueCardStyled
              key={venue._id}
              onClick={() => navigate(`/individual-dashboard/venue/${venue._id}`)}
            >
              <VenueImage
                src={venue?.documents?.images?.[0]?.url || ""}
                alt={venue?.venuename || "Venue image"}
              />
              <VenueInfo>
                <VenueName>{venue?.venuename || "Unnamed venue"}</VenueName>
                <VenueLocation>{venue?.location?.street || "Location not specified"}</VenueLocation>
                <VenueGuests>
                  {venue?.capacity?.minimum ?? "-"}-{venue?.capacity?.maximum ?? "-"} guests
                </VenueGuests>
                <VenuePrice>
                  ₦{(Number(venue?.price) || 0).toLocaleString()}/day
                </VenuePrice>
              </VenueInfo>
            </VenueCardStyled>
          ))
        ) : (
          <PageSubtitle>No indoor venues found</PageSubtitle>
        )}
      </IndoorGrid>
    </PageHolder>
  );
};

export default Indoor;

// -------------------- STYLES --------------------

const PageHolder = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 3rem;
  background-color: #ffffff;

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

const PageTitle = styled.h1`
  color: #0a0a0a;
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  color: #717182;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 400;
`;

const IndoorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const VenueCardStyled = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

const VenueImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
`;

const VenueInfo = styled.div`
  padding: 16px;
`;

const VenueName = styled.h3`
  color: #0a0a0a;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const VenueLocation = styled.p`
  color: #717182;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 8px 0;
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
  color: #7c3aed;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;