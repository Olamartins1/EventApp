import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import VenueCard from "../../components/VenueCard";
import { Navigate, useNavigate } from "react-router-dom";  

const All_venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
    const token = localStorage.getItem("authToken")
  console.log(token)
// const AuthToken =()=>{
  

//     {
//       Headers: {
//         Authorization:`Bearer ${token}`
//       }
//         }
//   }
  useEffect(() => {
    
    const fetchVenues = async () => {
      try {
        setLoading(true); 
        setError(null); 

        const response = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/allvenues",       {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        
        );
console.log(response.data.data)
        
        setVenues(response.data.data);
      } catch (err) {
        console.error(" Error fetching venues:", err);
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

      <VenuesGrid >
        {venues.length > 0 ? (
          venues.map((venue) => <div
onClick={() => navigate(`/individual-dashboard/venue/${venue._id}`)}  >
         
<img src={venue.documents.images[0].url}/>
<h3>{venue.venuename}</h3>
<span>{venue.location.street}</span>
<p>{venue.capacity.minimum}-</p>
<p>{venue.capacity.maximum}</p>
<p>#{venue.price}/day</p>
          </div>)
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
  font-family: Poppins;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  color: #717182;
  font-family: Poppins;
  font-size: 16px;
`;

const VenuesGrid = styled.div`
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