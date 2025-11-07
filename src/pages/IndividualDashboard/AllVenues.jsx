// // import { useEffect, useState } from "react";
// // import styled from "styled-components";
// // import axios from "axios";
// // import VenueCard from "../../components/VenueCard";

// // const All_venues = () => {
// //   const [venues, setVenues] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //     const token = localStorage.getItem("authToken")
// //   console.log(token)
// // // const AuthToken =()=>{
  

// // //     {
// // //       Headers: {
// // //         Authorization:`Bearer ${token}`
// // //       }
// // //         }
// // //   }
// //   useEffect(() => {
    
// //     const fetchVenues = async () => {
// //       try {
// //         setLoading(true); 
// //         setError(null); 

// //         const response = await axios.get(
// //           "https://eventiq-final-project.onrender.com/api/v1/allvenues",       {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
        
// //         );
// // console.log(response.data.data)
        
// //         setVenues(response.data.data);
// //       } catch (err) {
// //         console.error(" Error fetching venues:", err);
// //         setError(
// //           "Failed to load venues. Please check your network or try again later."
// //         );
// //       } finally {
// //         setLoading(false); 
// //       }
// //     };

// //     fetchVenues();
// //   }, []);

  
// //   if (loading) {
// //     return (
// //       <PageContainer>
// //         <PageTitle>Loading Venues...</PageTitle>
// //       </PageContainer>
// //     );
// //   }

 
// //   if (error) {
// //     return (
// //       <PageContainer>
// //         <PageTitle>Error</PageTitle>
// //         <PageSubtitle>{error}</PageSubtitle>
// //       </PageContainer>
// //     );
// //   }

  
// //   return (
// //     <PageContainer>
// //       <PageHeader>
// //         <PageTitle>Event Venues in Lagos</PageTitle>
// //         <PageSubtitle>{venues.length} venues available</PageSubtitle>
// //       </PageHeader>

// //       <VenuesGrid>
// //         {venues.length > 0 ? (
// //           venues.map((venue) => 
          
// //             <image_holder>
// // <img src={venue.documents.images[0].url}/>
// // <Wrapper>
// //                 <Feature_badge>
// //                   <Sparkle
// //                     style={{
// //                       width: "16px",
// //                       height: "16px",
// //                     }}
// //                   />
// //                   <span>Featured</span>
// //                 </Feature_badge>
// //               </Wrapper>
// //                </image_holder>
// //                 <Hall_info>
// //               <Hall_header>
// // <h3>{venue.venuename}</h3>
// //    </Hall_header>
// //     <p
// //                 style={{
// //                   fontSize: "0.875rem",
// //                   fontWeight: 600,
// //                   color: "#1f2937",
// //                   marginTop: "5px",
// //                   display: "flex",
// //                   justifyContent: "flex-start",
// //                 }}
// //               >{venue.location.street}  </p>
// //        <p
// //                 style={{
// //                   fontSize: "0.875rem",
// //                   fontWeight: 600,
// //                   color: "#1f2937",
// //                   display: "flex",
// //                   justifyContent: "flex-start",
// //                 }}
// //               >{venue.capacity.minimum}-</p>
// //   <p
// //                 style={{
// //                   fontSize: "0.875rem",
// //                   fontWeight: 600,
// //                   color: "#1f2937",
// //                   display: "flex",
// //                   justifyContent: "flex-start",
// //                 }}
// //               >
                
// // {venue.capacity.maximum}</p>
// //   <Hall_price>
// //                 <h3>
// // #{venue.price}/day</h3>
// //           </Hall_price>
// //           )
// //         ) : (
// //           <PageSubtitle>No venues found</PageSubtitle>
// //         )}
// //       </VenuesGrid>
// //     </PageContainer>
// //   );
// // };

// // export default All_venues;


// // const PageContainer = styled.div`
// //   max-width: 1400px;
// //   margin: 0 auto;
// //   padding: 1rem 3rem;

// //   @media (max-width: 768px) {
// //     padding: 1rem 1.5rem;
// //   }

// //   @media (max-width: 480px) {
// //     padding: 1rem 1rem;
// //   }
// // `;

// // const PageHeader = styled.div`
// //   margin-bottom: 2rem;
// // `;

// // const PageTitle = styled.h1`
// //   color: #0a0a0a;
// //   font-family: Poppins;
// //   font-size: 30px;
// //   font-weight: 500;
// //   margin-bottom: 0.5rem;
// // `;

// // const PageSubtitle = styled.p`
// //   color: #717182;
// //   font-family: Poppins;
// //   font-size: 16px;
// // `;

// // const VenuesGrid = styled.div`
// //   display: flex;
// //   flex-wrap: wrap;
// //   gap: 25px;
// //   height: 90%;

// //   @media (max-width: 768px) {
// //     gap: 20px;
// //   }

// //   @media (max-width: 480px) {
// //     gap: 15px;
// //     flex-direction: column;
// //   }
// // `;

// // const Image_holder = styled.div`
// //   position: relative;
// //   width: 290px;
// //   height: 290px;
// //   overflow: hidden;
// //   border-radius: 14px;

// //   img {
// //     width: 100%;
// //     height: 100%;
// //     object-fit: cover;
// //     transition: transform 0.9s;
// //     border-radius: 14px;
// //   }
// //   &:hover img {
// //     transform: scale(1.05);
// //   }
// // `;

// // const Feature_badge = styled.div`
// //   position: absolute;
// //   top: 1rem;
// //   left: 1rem;
// //   background-color: #fbbe24;
// //   color: #1f2937;
// //   padding: 0.5rem 0.75rem;
// //   border-radius: 2rem;
// //   display: flex;
// //   align-items: center;
// //   height: 0.5rem;
// //   gap: 0.25rem;
// //   font-size: 0.75rem;
// //   font-weight: 600;
// //   z-index: 1;
// // `;

// // const Wrapper = styled.div`
// //   position: absolute;
// //   width: 100%;
// //   height: 100%;
// //   top: 0;
// //   left: 0;
// //   background-color: #0000003c;
// //   padding: 20px;
// //   z-index: 5;
// // `;

// // const Hall_price = styled.div`
// //   display: flex;
// //   margin-top: -10px;
// //   gap: 5px;
// //   h3 {
// //     font-size: 17px;
// //     font-weight: 700;
// //     color: #603379;
// //   }
// // `;

// // const Feature_badge = styled.div`
// //   position: absolute;
// //   top: 1rem;
// //   left: 1rem;
// //   background-color: #fbbe24;
// //   color: #1f2937;
// //   padding: 0.5rem 0.75rem;
// //   border-radius: 2rem;
// //   display: flex;
// //   align-items: center;
// //   height: 0.5rem;
// //   gap: 0.25rem;
// //   font-size: 0.75rem;
// //   font-weight: 600;
// //   z-index: 1;
// // `;

// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// <<<<<<< HEAD
// import { Sparkles } from "lucide-react"; 
// =======
// import { useNavigate } from "react-router-dom";
// >>>>>>> 33e302d8f70f19530e5c8ff20de86538182a33ac

// const AllVenues = () => {
//   const [venues, setVenues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
// <<<<<<< HEAD

//   const token = localStorage.getItem("authToken");
//   console.log("Token:", token);

// =======
//   const navigate = useNavigate();
//   const token = localStorage.getItem("authToken");

// >>>>>>> 33e302d8f70f19530e5c8ff20de86538182a33ac
//   useEffect(() => {
//     const fetchVenues = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await axios.get(
//           "https://eventiq-final-project.onrender.com/api/v1/allvenues",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setVenues(response.data.data);
//       } catch (err) {
//         console.error("Error fetching venues:", err);
//         setError(
//           "Failed to load venues. Please check your network or try again later."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVenues();
//   }, [token]);

//   if (loading) {
//     return (
//       <PageContainer>
//         <PageTitle>Loading Venues...</PageTitle>
//       </PageContainer>
//     );
//   }

//   if (error) {
//     return (
//       <PageContainer>
//         <PageTitle>Error</PageTitle>
//         <PageSubtitle>{error}</PageSubtitle>
//       </PageContainer>
//     );
//   }

//   return (
//     <PageContainer>
//       <PageHeader>
//         <PageTitle>Event Venues in Lagos</PageTitle>
//         <PageSubtitle>{venues.length} venues available</PageSubtitle>
//       </PageHeader>

//       <VenuesGrid>
//         {venues.length > 0 ? (
//           venues.map((venue, index) => (
//             <VenueCardWrapper key={index}>
//               {/* <ImageHolder> */}
//                 <img
//                   src={venue?.documents?.images?.[0]?.url}
//                   alt={venue.venuename}
//                 />
//                 <Wrapper>
//                   <FeatureBadge>
//                     <Sparkles size={16} />
//                     <span>Featured</span>
//                   </FeatureBadge>
//                 </Wrapper>
//               {/* </ImageHolder> */}

//               <HallInfo>
//                 <HallHeader>
//                   <h3>{venue.venuename}</h3>
//                 </HallHeader>

//                 <p>{venue?.location?.street || "Location unavailable"}</p>
//                 <p>
//                   Capacity: {venue?.capacity?.minimum || 0} -{" "}
//                   {venue?.capacity?.maximum || 0} guests
//                 </p>

//                 <HallPrice>
//                   <h3>₦{venue.price}/day</h3>
//                 </HallPrice>
//               </HallInfo>
//             </VenueCardWrapper>
//             <VenueCard
//               key={venue._id}
//               onClick={() => Link(`/individual-dashboard/venue/${venue._id}`)}
//             >
//               <ImageWrapper>
//                 <VenueImage
//                   src={venue.documents.images[0].url}
//                   alt={venue.venuename}
//                 />
//                 {/* {index < 4 && <FeaturedBadge>⭐ Featured</FeaturedBadge>} */}
//               </ImageWrapper>

//               <CardContent>
//                 <VenueName>{venue.venuename}</VenueName>
//                 <Location>{venue.location.street}, Lagos</Location>
//                 <Capacity>
//                   {venue.capacity.minimum}-{venue.capacity.maximum} guests
//                 </Capacity>
//                 <Price>
//                   ₦{venue.price.toLocaleString()}
//                   <PriceUnit>/day</PriceUnit>
//                 </Price>
//               </CardContent>
//             </VenueCard>
//           ))
//         ) : (
//           <PageSubtitle>No venues found</PageSubtitle>
//         )}
//       </VenuesGrid>
//     </PageContainer>
//   );
// };

// export default AllVenues;



// const PageContainer = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
//   padding: 1rem 3rem;

//   @media (max-width: 768px) {
//     padding: 1rem 1.5rem;
//   }

//   @media (max-width: 480px) {
//     padding: 1rem;
//   }
// `;

// const PageHeader = styled.div`
//   margin-bottom: 2rem;
// `;

// const PageTitle = styled.h1`
//   color: #0a0a0a;
//   font-family: Poppins, sans-serif;
//   font-size: 30px;
//   font-weight: 500;
//   margin-bottom: 0.5rem;
// `;

// const PageSubtitle = styled.p`
//   color: #717182;
//   font-family: Poppins, sans-serif;
//   font-size: 16px;
// `;

// const VenuesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 24px;

//   @media (max-width: 1200px) {
//     grid-template-columns: repeat(3, 1fr);
//   }

//   @media (max-width: 900px) {
//     grid-template-columns: repeat(2, 1fr);
//     gap: 20px;
//   }

//   @media (max-width: 600px) {
//     grid-template-columns: 1fr;
//     gap: 16px;
//   }
// `;

// const VenueCardWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 290px;
//   border-radius: 14px;
//   overflow: hidden;
//   background: #fff;
//   box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
// `;

// // const ImageHolder = styled.div`
// const VenueCard = styled.div`
//   background: #ffffff;
//   border-radius: 12px;
//   overflow: hidden;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//   cursor: pointer;
//   transition: transform 0.2s ease, box-shadow 0.2s ease;

//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
//   }
// `;

// const ImageWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   height: 220px;
//   overflow: hidden;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.9s;
//   }

//   &:hover img {
//     transform: scale(1.05);
//   }
// `;

// const Wrapper = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   background-color: #0000003c;
//   padding: 20px;
//   z-index: 5;
// `;

// const FeatureBadge = styled.div`
//   position: absolute;
//   top: 1rem;
//   left: 1rem;
//   background-color: #fbbe24;
//   color: #1f2937;
//   padding: 0.5rem 0.75rem;
//   border-radius: 2rem;
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
//   font-size: 0.75rem;
//   font-weight: 600;
//   z-index: 1;
// `;

// const HallInfo = styled.div`
//   padding: 1rem;
//   background-color: #fff;

//   p {
//     font-size: 0.875rem;
//     font-weight: 600;
//     color: #1f2937;
//     margin: 5px 0;
//   }
// `;

// const HallHeader = styled.div`
//   h3 {
//     font-size: 1.1rem;
//     font-weight: 700;
//     color: #000;
//   }
// `;

// const HallPrice = styled.div`
//   margin-top: 10px;

//   h3 {
//     font-size: 17px;
//     font-weight: 700;
//     color: #603379;
//   }
// `;

// const VenueImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const FeaturedBadge = styled.div`
//   position: absolute;
//   top: 12px;
//   left: 12px;
//   background: #ff9800;
//   color: white;
//   padding: 6px 12px;
//   border-radius: 20px;
//   font-family: Poppins, sans-serif;
//   font-size: 12px;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   gap: 4px;
// `;

// const CardContent = styled.div`
//   padding: 16px 18px 20px 18px;
// `;

// const VenueName = styled.h3`
//   color: #0a0a0a;
//   font-family: Poppins, sans-serif;
//   font-size: 16px;
//   font-weight: 600;
//   margin: 0 0 6px 0;
//   line-height: 1.3;
// `;

// const Location = styled.p`
//   color: #717182;
//   font-family: Poppins, sans-serif;
//   font-size: 13px;
//   margin: 0 0 4px 0;
//   line-height: 1.4;
// `;

// const Capacity = styled.p`
//   color: #717182;
//   font-family: Poppins, sans-serif;
//   font-size: 13px;
//   margin: 0 0 12px 0;
//   line-height: 1.4;
// `;

// const Price = styled.p`
//   color: #5d3a8f;
//   font-family: Poppins, sans-serif;
//   font-size: 18px;
//   font-weight: 600;
//   margin: 0;
//   line-height: 1.2;
// `;

// const PriceUnit = styled.span`
//   color: #0a0a0a;
//   font-size: 13px;
//   font-weight: 400;
// `;

import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../assets/AuthContext/AuthContext";

const AllVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = useContext(AuthContext)

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

        setVenues(response.data.data);
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
  }, [token]);

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
            <VenueCard
              key={venue._id}
              onClick={() => navigate(`/individual-dashboard/venue/${venue._id}`)}
            >
              <ImageWrapper>
                <VenueImage
                  src={venue?.documents?.images?.[0]?.url || "/placeholder.jpg"}
                  alt={venue.venuename}
                />
                <FeaturedBadge>
                  <Sparkles size={14} />
                  Featured
                </FeaturedBadge>
              </ImageWrapper>

              <CardContent>
                <VenueName>{venue.venuename}</VenueName>
                <Location>{venue?.location?.street || "Location unavailable"}</Location>
                <Capacity>
                  Capacity: {venue?.capacity?.minimum || 0}–{venue?.capacity?.maximum || 0} guests
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
  );
};

export default AllVenues;


const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 3rem;
  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: #0a0a0a;
  font-family: Poppins, sans-serif;
  font-size: 30px;
  font-weight: 500;
`;

const PageSubtitle = styled.p`
  color: #717182;
  font-family: Poppins, sans-serif;
  font-size: 16px;
`;

const VenuesGrid = styled.div`
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
