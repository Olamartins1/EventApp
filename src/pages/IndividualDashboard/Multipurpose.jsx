import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import VenueCard from "../../components/VenueCard";

const Multipurpose = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMultipurposeVenues = async () => {
      try {
        setLoading(true);
        setError(null);

        
        const response = await axios.get(
          "https://eventiq-final-project.onrender.com/venues"
        );

        
        const multipurposeVenues = response.data.filter(
          (venue) =>
            venue.category?.toLowerCase() === "multipurpose" ||
            venue.type?.toLowerCase() === "multipurpose"
        );

        setVenues(multipurposeVenues);
      } catch (err) {
        console.error(" Error fetching multipurpose venues:", err);
        setError("Failed to load multipurpose venues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMultipurposeVenues();
  }, []);

  if (loading) {
    return (
      <MulHolder>
        <PageTitle>Loading Multipurpose Venues...</PageTitle>
      </MulHolder>
    );
  }

  if (error) {
    return (
      <MulHolder>
        <PageTitle>Error</PageTitle>
        <PageSubtitle>{error}</PageSubtitle>
      </MulHolder>
    );
  }

  return (
    <MulHolder>
      <MulHeader>
        <PageTitle>Multipurpose Event Halls in Lagos</PageTitle>
        <PageSubtitle>{venues.length} venues available</PageSubtitle>
      </MulHeader>

      <IndoorGrid>
        {venues.length > 0 ? (
          venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
        ) : (
          <PageSubtitle>No multipurpose venues found</PageSubtitle>
        )}
      </IndoorGrid>
    </MulHolder>
  );
};

export default Multipurpose;

const MulHolder = styled.div`
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

const MulHeader = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const PageTitle = styled.h1`
  color: #0a0a0a;
  font-family: "Poppins";
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  color: #717182;
  font-family: "Poppins";
  font-size: 1.2rem;
`;

const IndoorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  height: 90%;

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
    flex-direction: column;
  }
`;
