import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import VenueCard from "../../components/VenueCard";

const All_venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");
  console.log(token);
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/allvenues",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);

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

      <VenuesGrid>
        {venues.length > 0 ? (
          venues.map((venue) => (
            <div className="img">
              <img className="mainImg" src={venue.documents.images[0].url} />
              <h3>{venue.venuename}</h3>
              <span>{venue.location.street}</span>
              <div className="range">
                <p>{venue.capacity.minimum}-</p>
                <p>{venue.capacity.maximum}</p>
              </div>
              <p className="price">
                #{venue.price}
                <span className="subprice">/day</span>
              </p>
            </div>
          ))
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
  padding: 2rem 3rem;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  /* Account for the sticky header so the page title isn't hidden underneath it */
  padding-top: 100px;

  @media (max-width: 1400px) {
    max-width: 1200px;
    padding-top: 95px;
  }

  @media (max-width: 1200px) {
    max-width: 1024px;
    padding: 1.75rem 2.5rem;
    padding-top: 90px;
  }

  @media (max-width: 1024px) {
    max-width: 900px;
    padding: 1.5rem 2rem;
    padding-top: 85px;
  }

  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem;
    padding-top: 80px; /* tablet header smaller */
  }

  @media (max-width: 480px) {
    padding: 1rem;
    padding-top: 72px; /* mobile header height accounted for */
  }

  @media (max-width: 360px) {
    padding: 0.75rem;
    padding-top: 66px;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  position: relative;
  z-index: 2; /* keep title above grid items */

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
  }
`;

const PageTitle = styled.h1`
  color: #0a0a0a;
  font-family: Poppins;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;

  @media (max-width: 1024px) {
    font-size: 1.75rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 0.3rem;
  }
`;

const PageSubtitle = styled.p`
  color: #717182;
  font-family: Poppins;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const VenuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  width: 100%;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.75rem;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.25rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 0.5rem;
  }

  .img {
    width: 100%;
    height: auto;
    background: #fff;
    border-radius: 12px;
    padding: 0.75rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    z-index: 1;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      padding: 0.6rem;
    }

    @media (max-width: 480px) {
      padding: 0.5rem;
      max-width: 100%;
      margin: 0 auto;
    }

    h3 {
      margin: 0.75rem 0 0.25rem;
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      @media (max-width: 1024px) {
        font-size: 1.1rem;
      }

      @media (max-width: 768px) {
        font-size: 1rem;
        margin: 0.5rem 0 0.25rem;
      }

      @media (max-width: 480px) {
        font-size: 1.1rem;
      }
    }

    span {
      display: block;
      color: #666;
      font-size: 0.95rem;
      margin-bottom: 0.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      @media (max-width: 768px) {
        font-size: 0.85rem;
      }

      @media (max-width: 480px) {
        font-size: 0.9rem;
      }
    }
  }

  .range {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin: 0.75rem 0;
    background: #f8f8f8;
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    width: fit-content;

    @media (max-width: 768px) {
      margin: 0.5rem 0;
      padding: 0.3rem 0.6rem;
    }

    p {
      color: #555;
      font-size: 0.95rem;
      margin: 0;
      font-weight: 500;

      @media (max-width: 768px) {
        font-size: 0.85rem;
      }

      @media (max-width: 480px) {
        font-size: 0.9rem;
      }
    }
  }

  .price {
    color: #603379;
    font-weight: 700;
    font-size: 1.25rem;
    margin: 0.75rem 0 0;
    display: flex;
    align-items: center;
    gap: 0.3rem;

    @media (max-width: 1024px) {
      font-size: 1.15rem;
    }

    @media (max-width: 768px) {
      font-size: 1.1rem;
      margin: 0.5rem 0 0;
    }

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }

  .subprice {
    color: #717182;
    font-weight: normal;
    font-size: 0.9rem;

    @media (max-width: 768px) {
      font-size: 0.85rem;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  .mainImg {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 8px;
    margin: 0;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }

    @media (max-width: 1200px) {
      height: 200px;
    }

    @media (max-width: 1024px) {
      height: 180px;
    }

    @media (max-width: 768px) {
      height: 160px;
    }

    @media (max-width: 480px) {
      height: 200px;
    }
  }
`;
