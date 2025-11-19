import { Heart, Sparkle, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../assets/AuthContext/AuthContext";

const Halls = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const carouselRef = useRef(null);

  const itemsPerPage = 4; // Show 4 halls at a time

  const fetchHall = async () => {
    try {
      const res = await axios.get(
        "https://eventiq-final-project.onrender.com/api/v1/venues"
      );

      if (res?.data?.data && Array.isArray(res.data.data)) {
        setHalls(res.data.data);
      } else {
        setHalls([]);
        toast.info("No halls available at the moment.");
      }
    } catch (error) {
      console.error(error);
      setError(true);
      toast.error(error?.response?.data?.message || "Failed to fetch halls.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHall();
  }, []);

  const maxIndex = Math.max(0, halls.length - itemsPerPage);

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const cardWidth = 340; // 325px card + 15px gap
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  if (loading) {
    return (
      <Container>
        <p>Loading halls...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>Could not load halls. Please try again later.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Featured Event Halls</h2>
      <p>Discover our handpicked selection of premium venues</p>

      <CarouselWrapper>
        <ArrowButton
          onClick={handlePrevious}
          position="left"
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={28} />
        </ArrowButton>

        <Halls_container ref={carouselRef}>
          {halls.length > 0 ? (
            halls.map((hall) => (
              <Hall_card key={hall._id || hall.id}>
                <Image_holder
                  onClick={() => {
                    if (!user || user.role !== "venue-owner") {
                      toast.info("Please login");
                      navigate("/login");
                    } else {
                      navigate(`venue/${hall._id}`);
                    }
                  }}
                >
                  <img
                    src={hall?.documents?.images[0]?.url || "/placeholder.jpg"}
                    alt={hall?.venuename || "Venue"}
                  />
                  <Wrapper></Wrapper>
                </Image_holder>

                <Hall_info>
                  <Hall_header>
                    <h3>{hall?.venuename}</h3>
                  </Hall_header>
                  <p>{hall?.location?.city}</p>

                  <Hall_price>
                    <h3>
                      {hall?.price ? `₦ ${hall.price}` : "Price unavailable"}{" "}
                      <span>/day</span>
                    </h3>
                  </Hall_price>
                </Hall_info>
              </Hall_card>
            ))
          ) : (
            <p>No halls available right now.</p>
          )}
        </Halls_container>

        <ArrowButton
          onClick={handleNext}
          position="right"
          disabled={currentIndex >= maxIndex}
        >
          <ChevronRight size={28} />
        </ArrowButton>
      </CarouselWrapper>
    </Container>
  );
};

export default Halls;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1400px; // Contains exactly 4 cards
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 60px;
  margin: 0 auto;

  @media (max-width: 1400px) {
    max-width: 1050px; // 3 cards on smaller screens
  }

  @media (max-width: 1100px) {
    max-width: 700px; // 2 cards on tablets
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 50px;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  ${(props) => props.position}: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #603379;
    color: white;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(-50%) scale(0.95);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    ${(props) => props.position}: 5px;
  }
`;

const Hall_price = styled.div`
  display: flex;
  margin-top: -10px;
  gap: 5px;
  h3 {
    font-size: 17px;
    font-weight: 700;
    color: #603379;
  }
`;

const Hall_header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 15px;
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
    color: #0a0a0a;
    font-size: 1rem;
  }
`;

const Hall_info = styled.div`
  display: flex;
  flex-direction: column;
  width: 92%;
  justify-content: flex-start;
  p {
    font-size: 18px !important;
    color: #545454 !important;
    width: 100%;
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

const Image_holder = styled.div`
  position: relative;
  width: 300px;
  height: 290px;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.9s;
    border-radius: 14px;
  }
  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 260px;
    height: 260px;
  }
`;

const Hall_card = styled.div`
  width: 325px;
  flex-direction: column;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 280px;
  }
`;

const Halls_container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  width: 100%;
  overflow: hidden; // Changed from overflow-x: auto
  scroll-behavior: smooth;

  /* Hide scrollbar completely */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    overflow-x: auto; // Allow manual scroll on mobile
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  background-color: #ffffff;
  height: 100%;
  margin-bottom: 50px;

  h2 {
    font-size: 1.875rem;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 3px;
  }

  p {
    font-size: 1.25rem;
    color: #4b5563 !important;
  }

  @media (max-width: 768px) {
    padding-top: 1.5rem;

    h2 {
      font-size: 1.5rem;
      padding: 0 20px;
    }

    p {
      font-size: 1rem;
      padding: 0 20px;
    }
  }
`;
