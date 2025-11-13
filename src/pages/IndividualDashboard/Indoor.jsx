import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import VenueCard from "../../components/VenueCard";
import {useArea} from "../../assets/AreaContext/AreaContext"
import { Sparkles } from "lucide-react"; 
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../assets/AuthContext/AuthContext";

const Indoor = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {token} = useContext(AuthContext)
  const { selectedArea } = useArea();

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
        console.log(
          `https://eventiq-final-project.onrender.com/api/v1/allvenues-indoor?city=${selectedArea}`
        );

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
      <PageContainer>
        <PageTitle>Loading Indoor Venues...</PageTitle>
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

  // return (
  //   <PageHolder>
  //     <PageHeader>
        // <PageTitle>Indoor Event Halls in Lagos</PageTitle>
        // <PageSubtitle>{venues.length} venues available</PageSubtitle>













          return (
            <PageContainer>
              <PageHeader>
                <PageTitle>Indoor Event Halls in Lagos</PageTitle>
                <PageSubtitle>{venues.length} venues available</PageSubtitle>
              </PageHeader>
        
              <VenuesGrid>
                {venues.length > 0 ? (
                  venues.map((venue, index) => (
                    <VenueCardWrapper key={index}
                      onClick={() => navigate(`/venue/${venue._id}`)}
                    >

                      <ImageHolder>
                        <img
                          src={venue?.documents?.images?.[0]?.url}
                          alt={venue.venuename}
                        />
                        <Wrapper>
                          {/* <FeatureBadge>
                            <Sparkles size={16} />
                            <span>Featured</span>
                          </FeatureBadge> */}
                        </Wrapper>
                      </ImageHolder>
        
                      <HallInfo>
                        <HallHeader>
                          <h3>{venue.venuename}</h3>
                        </HallHeader>
        
                        <p>{venue?.location?.city || "Location unavailable"}</p>
                        <p>
                          {venue?.capacity?.minimum || 0}-
                          {venue?.capacity?.maximum || 0} guests
                        </p>
        
                        <HallPrice>
                          <h3>₦{venue.price.toLocaleString()}/day</h3>
                        </HallPrice>
                      </HallInfo>
                    </VenueCardWrapper>
                  ))
                ) : (
                  <PageSubtitle>No venues found</PageSubtitle>
                )}
              </VenuesGrid>
            </PageContainer>
          );
        };
        
        export default Indoor;
        
        
        
        const PageContainer = styled.div`
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        
          @media (max-width: 768px) {
            padding: 1rem 1.5rem;
          }
        
          @media (max-width: 480px) {
            padding: 1rem;
          }
        `;
        
        const PageHeader = styled.div`
          margin-bottom: 2rem;
        width: 97%;
        `;
        
        const PageTitle = styled.h1`
          color: #0a0a0a;
          font-family: Poppins;
         font-size: 20px;
         font-weight: 600;
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
          width: 97%;

        
          @media (max-width: 768px) {
            gap: 20px;
          }
        
          @media (max-width: 480px) {
            gap: 15px;
            flex-direction: column;
          }
        `;
        
        const VenueCardWrapper = styled.div`
          display: flex;
          flex-direction: column;
          width: 290px;
          border-radius: 14px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        `;
        
        const ImageHolder = styled.div`
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
        
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.9s;
          }
        
          &:hover img {
            transform: scale(1.05);
          }
        `;
        
        const Wrapper = styled.div`
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: #0000003c;
          padding: 20px;
          z-index: 5;
        `;
        
        const FeatureBadge = styled.div`
          position: absolute;
          top: 1rem;
          left: 1rem;
          background-color: #fbbe24;
          color: #1f2937;
          padding: 0.5rem 0.75rem;
          border-radius: 2rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 1;
        `;
        
        const HallInfo = styled.div`
          padding: 1rem;
          background-color: #fff;
        
          p {
            font-size: 0.875rem;
            font-weight: 600;
            color: #1f2937;
            margin: 5px 0;
          }
        `;
        
        const HallHeader = styled.div`
          h3 {
            font-size: 1.1rem;
            font-weight: 700;
            color: #000;
          }
        `;
        
        const HallPrice = styled.div`
          margin-top: 10px;
        
          h3 {
            font-size: 17px;
            font-weight: 700;
            color: #603379;
          }
        `;
        
      {/* </PageHeader>
  return (
    <PageHolder>
      <PageHeader>
        <PageTitle>Indoor Halls in Lagos</PageTitle>
        <PageSubtitle>{venues.length} venues available</PageSubtitle>
      </PageHeader>

      <IndoorGrid>
        {venues.length > 0 ? (
          venues.map((venue) => (
            <VenueCardStyled
              key={venue._id}
              onClick={() =>
                navigate(`/individual-dashboard/venue/${venue._id}`)
              }
            >
              <VenueImage
                src={venue.documents.images[0].url}
                alt={venue.venuename}
              />
              <VenueInfo>
                <VenueName>{venue.venuename}</VenueName>
                <VenueLocation>{venue.location.street}</VenueLocation>
                <VenueGuests>
                  {venue.capacity.minimum}-{venue.capacity.maximum} guests
                </VenueGuests>
                <VenuePrice>₦{venue.price.toLocaleString()}/day</VenuePrice>
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
`; */}


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
  color: #5b21b6;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;
