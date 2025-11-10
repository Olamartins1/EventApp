import { Heart, Sparkle, Star } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Halls = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetchHall = async () => {
    try {
      const res = await axios.get(
        "https://eventiq-final-project.onrender.com/api/v1/venues"
      );

      // check if response has valid data before setting
      if (res?.data?.data && Array.isArray(res.data.data)) {
        console.log(res.data.data);
        setHalls(res.data.data);
      } else {
        setHalls([]); // fallback empty array
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

  // ❌ your useEffect had a bug — it called the function immediately
  // ✅ should pass a function instead:
  useEffect(() => {
    fetchHall();
  }, []);

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

      <Halls_container>
        {halls.length > 0 ? (
          halls.map((hall) => (
            <Hall_card key={hall._id || hall.id}>
              <Image_holder
                onClick={() =>
                  navigate(`/individual-dashboard/venue/${hall._id}`)
                }
              >
                <img
                  src={hall?.documents?.images[0].url || "/placeholder.jpg"}
                  alt={hall?.name || "Venue"}
                />
                <Wrapper>
                  <Feature_badge>
                    <Sparkle
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                    />
                    <span>Featured</span>
                  </Feature_badge>
                </Wrapper>
              </Image_holder>

              <Hall_info>
                <Hall_header>
                  <h3>{hall?.venuename || "Unnamed Hall"}</h3>
                </Hall_header>
                {/* <p>{hall?.location || "Unknown location"}</p> */}
                <p>
                  {hall?.hallsize
                    ? `${hall.hallsize} guests`
                    : "Guest info not available"}
                </p>

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
    </Container>
  );
};

export default Halls;

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

const Hall_rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.15rem 0.8rem;
  border-radius: 0.375rem;
  margin-right: 20px;
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
  justify-content: flex-start;
  p {
    font-size: 15px !important;
    color: #545454 !important;
    // margin: 0 0 0.5rem 0;
    margin-left: -10px;
    width: 100px;
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
  width: 290px;
  height: 290px;
  overflow: hidden;
  border-radius: 14px;

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

const Feature_badge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: #fbbe24;
  color: #1f2937;
  padding: 0.5rem 0.75rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  height: 0.5rem;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 1;
`;

const Hall_card = styled.div`
  width: 320px;
  flex-direction: column;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 280px;
  }
`;

const Halls_container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  width: 50%;
  height: 100%;
  justify-content: center;
  // align-items: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    width: 90%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 20px;
    margin: 0;
    gap: 15px;

    /* Smooth scrolling */
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;

    /* Hide scrollbar but keep functionality */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }
`;

const Container = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  padding-top: 2rem;
  background-color: #ffffff;
  height: 100%;
  margin-bottom: 50px;

  h2 {
    text-align: center;
    font-size: 1.875rem;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 3px;
  }

  p {
    font-size: 1.25rem;
    color: #4b5563 !important;
    color: red;
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
