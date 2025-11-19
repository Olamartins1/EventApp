import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useArea } from "../../assets/AreaContext/AreaContext";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
import Loading from "../../components/static/Loading/Loading";

const AllVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { selectedArea } = useArea();

  const getArr = JSON.parse(localStorage.getItem("myArea"));

  console.log("this is it", getArr);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://eventiq-final-project.onrender.com/api/v1/allvenues/?city=${selectedArea}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVenues(response.data.data);

        // localStorage.setItem("areas", JSON.stringify(areas));
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
  }, [token, selectedArea]);

  if (loading) {
    return (
      <PageContainer>
        <PageTitle>
          {" "}
          <Loading />
        </PageTitle>
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
    <>
      {loading && <Loading />}
      <PageContainer>
        <PageHeader>
          <PageTitle>Event Venues in Lagos</PageTitle>
          <PageSubtitle>{venues.length} venues available</PageSubtitle>
        </PageHeader>

        <VenuesGrid>
          {venues.length > 0 ? (
            venues.map((venue) => (
              <VenueCard
                key={venue._id}
                onClick={() => navigate(`/venue/${venue._id}`)}
              >
                <ImageWrapper>
                  <VenueImage
                    src={
                      venue?.documents?.images?.[0]?.url || "/placeholder.jpg"
                    }
                    alt={venue.venuename}
                  />
                  {/* <FeaturedBadge>
                  <Sparkles size={14} />
                  Featured
                </FeaturedBadge> */}
                </ImageWrapper>

                <CardContent>
                  <VenueName>{venue.venuename}</VenueName>
                  <Location>
                    {venue?.location?.city.charAt(0).toUpperCase() +
                      venue?.location?.city.slice(1).toLowerCase() ||
                      "Location unavailable"}
                  </Location>
                  <Capacity>
                    {venue?.capacity?.minimum || 0}–
                    {venue?.capacity?.maximum || 0} guests
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
    </>
  );
};

export default AllVenues;

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 3rem;
  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const PageHeader = styled.div`
  width: 97%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: #0a0a0a;
  font-family: Poppins, sans-serif;
  font-size: 20px;
  font-weight: 600;
`;

const PageSubtitle = styled.p`
  color: #717182;
  font-family: Poppins, sans-serif;
  font-size: 16px;
`;

const VenuesGrid = styled.div`
  width: 97%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
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

const VenueImage = styled.img``;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: #fbbe24;
  color: #1f2937;
  padding: 6px 12px;
  border-radius: 20px;
  font-family: Poppins, sans-serif;
  font-size: 12px;
  font-weight: 600;
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
  margin-bottom: 6px;
`;

const Location = styled.p`
  color: #717182;
  font-family: Poppins, sans-serif;
  font-size: 13px;
  margin-bottom: 4px;
`;

const Capacity = styled.p`
  color: #717182;
  font-family: Poppins, sans-serif;
  font-size: 13px;
  margin-bottom: 12px;
`;

const Price = styled.p`
  color: #5d3a8f;
  font-family: Poppins, sans-serif;
  font-size: 18px;
  font-weight: 600;
`;

const PriceUnit = styled.span`
  color: #0a0a0a;
  font-size: 13px;
  font-weight: 400;
`;
