import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Sparkle, Star } from "lucide-react";

export const VenueCard = ({ venue }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/individual-dashboard/venue/${venue.id}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <ImageContainer>
        <VenueImage src={venue.image || "/placeholder.svg"} alt={venue.name} />
        <Blur>
          {venue.featured && (
            <FeaturedBadge>
              <Sparkle size={16} /> Featured
            </FeaturedBadge>
          )}
        </Blur>
      </ImageContainer>
      <CardContent>
        <VenueName>
          {venue.name}
          <RatingContainer>
            <Star size={14} fill="#fbbf24" color="#fbbf24" />
            <span>{venue.rating}</span>
          </RatingContainer>
        </VenueName>
        <VenueLocation>{venue.location}</VenueLocation>
        <VenueInfo>
          <span>{venue.guests}</span>
        </VenueInfo>
        <PriceContainer>
          <Price>
            {venue.price}
            <PriceLabel> /day</PriceLabel>
          </Price>
        </PriceContainer>
      </CardContent>
    </CardContainer>
  );
};

export default VenueCard;
const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000039;
  width: 100%;
  height: 100%;
`;
const CardContainer = styled.div`
  /* background: white; */
  width: 293px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 290px;
  overflow: hidden;
  background: #f3f4f6;
  border-radius: 0.75rem;
`;

const VenueImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: #fbbe24;
  color: #1f2937;
  padding: 0.5rem 0.75rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  height: 10px;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 10;
`;

const CardContent = styled.div`
  /* padding: 1.5rem; */
`;

const VenueName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const VenueLocation = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  /* margin-bottom: 0.75rem; */
  margin: 0;
`;

const VenueInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
  font-size: 0.85rem;
  color: #6b7280;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span {
    font-size: 14px;
    font-weight: 500;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #6b46c1;
  display: flex;
  align-items: center;
`;

const PriceLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-left: 3px;
`;
