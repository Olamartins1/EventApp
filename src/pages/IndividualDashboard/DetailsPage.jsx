import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { venuesData } from "../../data/venuesData";
import { ChevronLeft, MapPin, Clock, AlertCircle, Check } from "lucide-react";
import { useState,useEffect } from "react";
import axios from "axios";

const DetailsPage = () => {
  const { id } = useParams();
  console.log("i am id", id)
  const navigate = useNavigate();
 const [venue, setVenue] = useState({}) 
 const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://eventiq-final-project.onrender.com/api/v1/getOneVenue/${id}`
        );
        setVenue(res.data?.data || null);
      } catch (error) {
        console.error("Error fetching venue:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);
  


  if (loading) return <p>Loading venue...</p>;
console.log("the venue",venue)
  if (!venue) {
    return (
      <DetailContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
          Back
        </BackButton>
        <div>Venue not found</div>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <ChevronLeft size={20} />
        Back
      </BackButton>


    <VenueHeader>
            <VenueName>{
            venue.venuename}
            </VenueName>
            <VenueMetaInfo>
              <MetaItem>
                {venue.status}
              </MetaItem>
           
              
            </VenueMetaInfo>

              <MetaItem>
                <MapPin size={16} />
                {venue.location.street },{venue.location.city },{venue.location.state}
              </MetaItem>
              <MetaItem>
                <AlertCircle size={16} />
              {venue.capacity.minimum}- {venue.capacity.maximum}
              </MetaItem>
          </VenueHeader>
    <ImageGallery>
  {/* Main Image */}
  {venue?.documents?.images?.[0]?.url && (
    <MainImage
      src={venue.documents.images[0].url}
      alt={venue.name || "Venue Image"}
    />
  )}

  {/* Other Images (if more than one exists) */}
  {venue?.documents?.images?.length > 1 && (
    <>
      {venue.documents.images.slice(1, 5).map((img, idx) => (
        <GalleryImage
          key={idx}
          src={img.url}
          alt={`${venue.name || "Venue"} ${idx + 2}`}
        />
      ))}
    </>
  )}
</ImageGallery>
      <ContentWrapper>
        <MainContent>
         

          <Section>
            <SectionTitle>About this venue</SectionTitle>
            <SectionDescription>{venue.description}</SectionDescription>
            <InfoGrid>
              <InfoCard>
                <InfoLabel>Venue Size</InfoLabel>
                <InfoValue>{venue.hallsize}</InfoValue>
              </InfoCard>
              <InfoCard>
                <InfoLabel>
                  <Clock size={16} />
                  Open Hours
                </InfoLabel>
                <InfoValue>{venue.openingtime}am - {venue.closingtime}pm</InfoValue>
              </InfoCard>
             
              <InfoCard>
                <InfoLabel>Caution Fee</InfoLabel>
                <InfoValue>#{venue.cautionfee}</InfoValue>
              </InfoCard>
                <InfoCard>
                <InfoLabel>About this Venue</InfoLabel>
                <InfoValue>{venue.description}</InfoValue>
              </InfoCard>
                <InfoCard>
                <InfoLabel>Amenities and Facilities</InfoLabel>
                <InfoValue>{venue.amenities}</InfoValue>
              </InfoCard>
            </InfoGrid>

          </Section>

          <Section>
            <SectionTitle>Amenities & Facilities</SectionTitle>
            <AmenitiesList>
              {/* {venue.amenities.map((amenity, idx) => (
                <AmenityItem key={idx}>
                  <Check size={18} color="#6b46c1" />
                  {amenity}
                </AmenityItem>
              ))} */}
            </AmenitiesList>
          </Section>

          <Section>
            <SectionTitle>Cancellation Policy</SectionTitle>
            <CancellationPolicy>
              <PolicyTitle>
                <AlertCircle size={18} />
                Important Information
              </PolicyTitle>
              <PolicyText>
              <h2>Free cancellation up to 30 days before the event. 50% refund for cancellation made 15-30 days before. No refund for cancellation within 15 days of the event date. Caution fee is refundable upon successful event completion without any damages.</h2>


              </PolicyText>
            </CancellationPolicy>
          </Section>
        </MainContent>

        <Sidebar>
          <PricingCard>
            <PriceDisplay>
              <PriceAmount>{venue.price}</PriceAmount>
              <PriceLabel>/day</PriceLabel>
            </PriceDisplay>

            <DateSelector>
              <DateLabel>Event Date</DateLabel>
              <DateInput type="date" />
            </DateSelector>

            <BookButton>Book This Venue</BookButton>

            <PricingBreakdown>
              <BreakdownItem>
                <span>Venue rental</span>
                <span>{venue.price}</span>
              </BreakdownItem>
              <BreakdownItem>
                <span>Service fee (5%)</span>
                <span>
                  ₦{Math.round(venue.price * 0.05).toLocaleString()}
                </span>
              </BreakdownItem>
              <BreakdownItem>
                <span>Total</span>
                <span>
                  ₦
                  {Math.round(
                    venue.price * 0.05+ venue.price 
                  ).toLocaleString()}
                </span>
              </BreakdownItem>
            </PricingBreakdown>
          </PricingCard>
        </Sidebar>
      </ContentWrapper>
    </DetailContainer>
  );
};

export default DetailsPage;

const DetailContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    width: 95%;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 1rem 0.5rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #6b46c1;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    gap: 1rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 300px 300px;
  gap: 1rem;
  margin-bottom: 2rem;
  border-radius: 0.75rem;
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-template-rows: 250px 250px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 250px repeat(4, 150px);
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    grid-template-rows: 200px repeat(4, 120px);
  }
`;

const MainImage = styled.img`
  grid-column: 1;
  grid-row: 1 / 3;
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 1;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div``;

const VenueHeader = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const VenueName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const VenueMetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const SectionDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const InfoCard = styled.div`
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

const InfoLabel = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const InfoValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const AmenitiesList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #6b7280;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    gap: 0.5rem;
  }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 120px;
  height: fit-content;

  @media (max-width: 1024px) {
    position: static;
  }
`;

const PricingCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const PriceDisplay = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const PriceAmount = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #6b46c1;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const PriceLabel = styled.div`
  color: #6b7280;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const DateSelector = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const DateLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const DateInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #6b46c1;
    box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.1);
  }

  @media (max-width: 480px) {
    padding: 0.625rem;
    font-size: 0.875rem;
  }
`;

const BookButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #6b46c1, #9333ea);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(107, 70, 193, 0.3);
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
    font-size: 0.95rem;
  }
`;

const PricingBreakdown = styled.div`
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const BreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: #6b7280;

  &:last-child {
    margin-bottom: 0;
    padding-top: 0.75rem;
    border-top: 1px solid #e5e7eb;
    font-weight: 600;
    color: #1f2937;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const CancellationPolicy = styled.div`
  background-color: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

const PolicyTitle = styled.div`
  font-weight: 600;
  color: #92400e;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const PolicyText = styled.p`
  color: #b45309;
  font-size: 0.9rem;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;
