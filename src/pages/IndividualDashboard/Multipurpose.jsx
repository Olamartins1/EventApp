import React from "react";
import styled from "styled-components";
import axios from "axios";
import {useArea} from "../../assets/AreaContext/AreaContext"
import {useEffect, useState} from "react"


 
const Multipurpose = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const token = localStorage.getItem("authToken")
const {selectedArea}= useArea()
  useEffect(() => {
    const fetchIndoorVenues = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
              `https://eventiq-final-project.onrender.com/api/v1/allvenues-multipurpose?city=${selectedArea}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(`https://eventiq-final-project.onrender.com/api/v1/allvenues-multipurpose?city=${selectedArea}`,
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
  }, [token, selectedArea]);


 if (loading) {
    return (
      <PageHolder>
        <PageTitle>Loading Indoor Venues...</PageTitle>
      </PageHolder>
    );
  }

  if (error) {
    return (
      <PageHolder>
        <PageTitle>Error</PageTitle>
        <PageSubtitle>{error}</PageSubtitle>
      </PageHolder>
    );
  }

  return (
    <PageHolder>
      <PageHeader>
        <PageTitle>Multipurpose Halls in Lagos</PageTitle>
        <PageSubtitle>{venues.length} venues available</PageSubtitle>
      </PageHeader>

      <IndoorGrid>
        {venues.length > 0 ? (
          venues.map((venue) => <div> 
<img src={venue.documents.images[0].url}/>
<h3>{venue.venuename}</h3>
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

export default Multipurpose;

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
`;