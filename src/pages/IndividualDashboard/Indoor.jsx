
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import VenueCard from "../../components/VenueCard";
import {useArea} from "../../assets/AreaContext/AreaContext"
import { Sparkles } from "lucide-react"; 

const Indoor = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
console.log(`https://eventiq-final-project.onrender.com/api/v1/allvenues-indoor?city=${selectedArea}`,
)
        // // Depending on API structure
        // const allVenues = response.data.data || response.data;

        // // Filter for indoor only
        // const indoorVenues = allVenues.filter(
        //   (venue) =>
        //     venue.category?.toLowerCase() === "indoor" ||
        //     venue.type?.toLowerCase() === "indoor"
        // );

       setVenues(response.data.data);
      } catch (err) {
        console.error("Error fetching indoor venues:", err);
        setError("Failed to load indoor venues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIndoorVenues();
  }, [token,selectedArea]);

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
                    <VenueCardWrapper key={index}>
                      <ImageHolder>
                        <img
                          src={venue?.documents?.images?.[0]?.url}
                          alt={venue.venuename}
                        />
                        <Wrapper>
                          <FeatureBadge>
                            <Sparkles size={16} />
                            <span>Featured</span>
                          </FeatureBadge>
                        </Wrapper>
                      </ImageHolder>
        
                      <HallInfo>
                        <HallHeader>
                          <h3>{venue.venuename}</h3>
                        </HallHeader>
        
                        <p>{venue?.location?.street || "Location unavailable"}</p>
                        <p>
                          Capacity: {venue?.capacity?.minimum || 0} -{" "}
                          {venue?.capacity?.maximum || 0} 
                        </p>
        
                        <HallPrice>
                          <h3>₦{venue.price}/day</h3>
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
        
          @media (max-width: 768px) {
            padding: 1rem 1.5rem;
          }
        
          @media (max-width: 480px) {
            padding: 1rem;
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

      <IndoorGrid>
        {venues.length > 0 ? (
          venues.map((venue) => <div> 
<img src={venue.documents.images[0].url}/>
<h3>{venue.venuename}</h3>
        {console.log(venue)}
<span>{venue.location.street}</span>
<p>{venue.capacity.minimum}-</p>
<p>{venue.capacity.maximum}</p>
<p>#{venue.price}/day</p>
          </div>)
        )  : (
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
`; */}
