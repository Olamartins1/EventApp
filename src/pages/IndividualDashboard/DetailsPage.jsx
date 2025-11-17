import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { venuesData } from "../../data/venuesData";
import { ChevronLeft, MapPin, Clock, AlertCircle, Check } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
import { MdOutlineVerified } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import Loading from "../../components/static/Loading/Loading";

const DetailsPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();
  const [venue, setVenue] = useState({});
  const [loading, setLoading] = useState(true);
  const [eventDate, setEventDate] = useState("");
  const [days, setDays] = useState(1);
  const [eventType, setEventType] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [errorField, setErrorField] = useState("");

  let theAmount = venue?.price || 0;
  const validDays = Number(days) > 0 ? Number(days) : 0;
  // let servicecharge = days > 0 ? (theAmount * days * 5) / 100 : 0;

  useEffect(() => {
  setDays(1);
}, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://eventiq-final-project.onrender.com/api/v1/getOneVenue/${id}`
        );
        setVenue(res.data?.data);
      } catch (error) {
        console.error("Error fetching venue:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);
  const handleEventTypeChange = (e) => {
    const value = e.target.value.trim();

    if (value === "") {
      setEventType("");
      setErrorField("eventType");
      return;
    }

    setEventType(value);
    setErrorField("");
  };

  const handleDaysChange = (e) => {
    const value = e.target.value.trim();

    if (value === "") {
      setDays("");
      setErrorField("days");
      return;
    }

    const numberValue = Number(value);

    if (!Number.isInteger(numberValue) || numberValue <= 0) {
      setErrorField("days");
      toast.error("Days must be a valid number");
      return;
    }

    if (numberValue > 1) {
      setErrorField("days");
      toast.error("You can only book for 1 day");
      return;
    }

    setDays(numberValue);
    setErrorField("");
  };

  const bookVenue = async () => {
    // if (isNaN(days) || days <= 0) {
    //   <small>please input a valid number of day</small>;
    //   return;
    // }

    if (!eventDate || !eventType || !days) {
      toast.error("Please fill in all fields before booking");
      console.log("event:", eventDate == false);
      console.log("type:", eventType == false);
      console.log("days:", days == false);
      return;
    }

    try {
      setIsBooking(true);
      console.log({
        // servicecharge: venue.price * 0.05,
        total: venue.price * 0.05 + venue.price,
      });
      const res = await axios.post(
        `https://eventiq-final-project.onrender.com/api/v1/booking/${id}`,
        {
          date: eventDate,
          days,
          eventType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      setShowPopup(true);
    } catch (error) {
      console.log(error);
      // toast.error(error.res.data.message || "Somethin went wrong");
    } finally {
      setIsBooking(false); // re-enable button after request
    }
  };
  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    const [year, month, day] = inputDate.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    setEventDate(formattedDate);
  };
  if (loading) {
    return (
      <DetailContainer>
        <p>Loading venue details...</p>
      </DetailContainer>
    );
  }

  if (error) {
    return (
      <DetailContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
          Back
        </BackButton>
      </DetailContainer>
    );
  }

  return (
    <>
      {loading && <Loading />}
      {!venue ? (
        <>
          <DetailContainer>
            <BackButton onClick={() => navigate(-1)}>
              <ChevronLeft size={20} />
              Back
            </BackButton>
            <ErrorBox>
              <h2>Venue not found!</h2>
              <p>Venues may have been removed or is currently unavailable.</p>
            </ErrorBox>
          </DetailContainer>
        </>
      ) : (
        <>
          {/* : ( */}
          <DetailContainer>
            <BackButton onClick={() => navigate(-1)}>
              <ChevronLeft size={20} />
              Back
            </BackButton>

            <VenueHeader>
              <VenueName>
                {venue?.venuename}
                <VenueMetaInfo>
                  <MetaItemStatus>
                    <MdOutlineVerified />
                    {venue?.status}
                  </MetaItemStatus>
                </VenueMetaInfo>
              </VenueName>

              <MetaItem>
                <MapPin size={16} />
                {venue?.location?.city},{venue?.location?.state}
                <MetaItemPeople>
                  <MdOutlinePeopleAlt size={20} />
                  {venue?.capacity?.minimum}- {venue?.capacity?.maximum} guests
                </MetaItemPeople>
              </MetaItem>
            </VenueHeader>
            <ImageGallery>
              {venue?.documents?.images?.[0]?.url && (
                <MainImage
                  src={venue?.documents?.images[0].url}
                  alt={venue?.name || "Venue Image"}
                />
              )}
              {venue?.documents?.images?.length > 1 && (
                <>
                  {venue?.documents?.images.slice(1, 5).map((img, idx) => (
                    <GalleryImage
                      key={idx}
                      src={img.url}
                      alt={`${venue?.name || "Venue"} ${idx + 2}`}
                    />
                  ))}
                </>
              )}
            </ImageGallery>
            <ContentWrapper>
              <MainContent>
                <Section>
                  <SectionTitle>About this venue</SectionTitle>
                  <SectionDescription>{venue?.description}</SectionDescription>
                  <InfoGrid>
                    <InfoCard>
                      <InfoLabel>Venue Size</InfoLabel>
                      <InfoValue>{venue?.hallsize}</InfoValue>
                    </InfoCard>
                    <InfoCard>
                      <InfoLabel>
                        <Clock size={16} />
                        Open Hours
                      </InfoLabel>
                      <InfoValue>
                        {venue?.openingtime}am - {venue?.closingtime}pm
                      </InfoValue>
                    </InfoCard>

                    <InfoCard>
                      <InfoLabel>Caution Fee</InfoLabel>
                      <InfoValue>₦{venue?.cautionfee}</InfoValue>
                    </InfoCard>
                    <InfoCard>
                      <SectionTitle>Amenities & Facilities</SectionTitle>
                      <InfoValue>{venue?.amenities}</InfoValue>
                    </InfoCard>
                  </InfoGrid>
                </Section>
                <Section>
                  <SectionTitle>Cancellation Policy</SectionTitle>
                  <CancellationPolicy>
                    <PolicyTitle>
                      <AlertCircle size={18} />
                      Important Information
                    </PolicyTitle>
                    <PolicyText>
                      <span>
                        Free cancellation up to 30 days before the event. 50%
                        refund for cancellation made 15-30 days before. No
                        refund for cancellation within 15 days of the event
                        date. Caution fee is refundable upon successful event
                        completion without any damages.
                      </span>
                    </PolicyText>
                  </CancellationPolicy>
                </Section>
              </MainContent>

              <Sidebar>
                <PricingCard>
                  <PriceDisplay>
                    <PriceAmount>{venue?.price?.toLocaleString()}</PriceAmount>
                    <PriceLabel>/day</PriceLabel>
                  </PriceDisplay>
                  <DateSelector>
                    <DateLabel>Event Date</DateLabel>
                    <DateInput
                      type="date"
                      min={new Date().toISOString().split("T")[0]} // disables past dates
                      onChange={handleDateChange}
                    />
                  </DateSelector>

                  <EventContainer>
                    <EventType>Event Type</EventType>
                    <input
                      type="text"
                      placeholder="e.g: birthday, graduation, wedding"
                      onChange={handleEventTypeChange}
                      style={{
                        borderColor:
                          errorField === "eventType" ? "red" : "#e5e7eb",
                        boxShadow:
                          errorField === "eventType"
                            ? "0 0 0 3px rgba(255, 0, 0, 0.1)"
                            : "none",
                      }}
                    />

                    <NumberType>Number of Day</NumberType>
                    <input
                      type="text"
                      value={days}
                      disabled
                      style={{
                        background: "#f3f4f6",
                        cursor: "not-allowed",
                      }}
                    />
                  </EventContainer>

                  <PricingBreakdown>
                    <BreakdownItem>
                      <span>Venue fee</span>
                      <span>
                        ₦{validDays ? theAmount.toLocaleString() : "0"}
                      </span>
                    </BreakdownItem>

                    <BreakdownItem>
                      {/* <span>Service fee (5%)</span>
                      <span>
                        ₦
                        {days > 0
                          ? ((theAmount * 1 * 5) / 100).toLocaleString()
                          : "0"}
                      </span> */}
                    </BreakdownItem>

                    <BreakdownItem>
                      <span>Caution Fee</span>
                      <span>
                        ₦{days > 0 ? venue?.cautionfee?.toLocaleString() : "0"}
                      </span>
                    </BreakdownItem>

                    <BreakdownItem>
                      <span>Total</span>
                      <span>
                        ₦
                        {days > 0
                          ? (
                              theAmount * days +
                              venue?.cautionfee
                            ).toLocaleString()
                          : "0"}
                      </span>
                    </BreakdownItem>
                  </PricingBreakdown>
                </PricingCard>
                <BookButton onClick={bookVenue} disabled={isBooking}>
                  {isBooking ? "Booking..." : "Book This Venue"}
                </BookButton>
              </Sidebar>
            </ContentWrapper>
            {showPopup && (
              <PopupOverlay>
                <PopupBox>
                  <h2>🎉 Thank you for choosing Eventiq!</h2>
                  <p>Your booking request has been submitted successfully.</p>
                  <p>
                   Please note that it will be reviewed, and you will receive an update within 24 hours.
                  </p>

                  <Link
                    to="/individual-dashboard"
                    onClick={() => setShowPopup(false)}
                  >
                    <CloseButton>Close</CloseButton>
                  </Link>
                </PopupBox>
              </PopupOverlay>
            )}
          </DetailContainer>
          );
        </>
      )}
    </>
  );
};

export default DetailsPage;

const EventContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;

  input {
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
  }
`;

const EventType = styled.div`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;
const NumberType = styled.div`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1f2937;
  margin-top: 1.8rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

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
  display: flex;
  align-items: center;
  width: 60%;
  gap: 3rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    width: 100%;
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
const MetaItemPeople = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.95rem;
  margin-left: 3rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const MetaItemStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  padding: 4px 8px;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  margin-top: 1rem;
  background-color: rgba(52, 150, 35, 1);

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

const Input = styled.div`
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
  background: #603379;
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

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const PopupBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  h2 {
    color: #6b46c1;
    margin-bottom: 1rem;
  }

  p {
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
`;

const CloseButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: #6b46c1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background: #4c288b;
  }
`;
