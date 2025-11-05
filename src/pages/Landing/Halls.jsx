// import { Heart, Sparkle, Star } from "lucide-react";
// import styled from "styled-components";

// const halls = [
//   {
//     id: 1,
//     image:
//       "https://res.cloudinary.com/dg9hdp34k/image/upload/v1761301025/Fea1_jegvae.jpg",
//     name: "Versatile Events Center",
//     location: "Ikeja GRA, Lagos",
//     guests: "200-500 guests",
//     price: "₦420,000",
//     rating: 5.0,
//   },
//   {
//     id: 2,
//     image:
//       "https://res.cloudinary.com/dg9hdp34k/image/upload/v1761301025/Fea2_qmo6dv.jpg",
//     name: "Imperial Marquee Hall",
//     location: "Ajah, Lagos",
//     guests: "400-700 guests",
//     price: "₦480,000",
//     rating: 4.8,
//   },
//   {
//     id: 3,
//     image:
//       "https://res.cloudinary.com/dg9hdp34k/image/upload/v1761301025/Fea3_dqarue.jpg",
//     name: "Skyline Rooftop Venue",
//     location: "Ikoyi, Lagos",
//     guests: "200-400 guests",
//     price: "₦600,000",
//     rating: 4.8,
//   },
//   {
//     id: 4,
//     image:
//       "https://res.cloudinary.com/dg9hdp34k/image/upload/v1761301026/Fea4_yfdkeu.jpg",
//     name: "Lush Garden Paradise",
//     location: "Lekki Phase 1, Lagos",
//     guests: "300-600 guests",
//     price: "₦550,000",
//     rating: 4.7,
//   },
// ];

// const Halls = () => {
//   return (
//     <Container>
//       <h2>Featured Event Halls</h2>
//       <p>Discover our handpicked selection of premium venues</p>

//       <Halls_container>
//         {halls.map((hall) => (
//           <Hall_card key={hall.id}>
//             <Image_holder>
//               <img src={hall.image} alt={hall.name} />
//               <Wrapper>
//                 <Feature_badge>
//                   <Sparkle
//                     style={{
//                       width: "16px",
//                       height: "16px",
//                     }}
//                   />
//                   <span>Featured</span>
//                 </Feature_badge>
//               </Wrapper>
//             </Image_holder>

//             <Hall_info>
//               <Hall_header>
//                 <h3>{hall.name}</h3>
//                 <Hall_rating>
//                   <Star
//                     style={{
//                       width: "16px",
//                       height: "16px",
//                       color: "#fbbf24",
//                       fill: "#fbbf24",
//                     }}
//                   />
//                   <span>{hall.rating}</span>
//                 </Hall_rating>
//               </Hall_header>
//               <p
//                 style={{
//                   fontSize: "0.875rem",
//                   fontWeight: 600,
//                   color: "#1f2937",
//                   marginTop: "5px",
//                   display: "flex",
//                   justifyContent: "flex-start",
//                 }}
//               >
//                 {hall.location}
//               </p>
//               <p
//                 style={{
//                   fontSize: "0.875rem",
//                   fontWeight: 600,
//                   color: "#1f2937",
//                   display: "flex",
//                   justifyContent: "flex-start",
//                 }}
//               >
//                 {hall.guests}
//               </p>

//               <Hall_price>
//                 <h3>
//                   {hall.price} <span>/day</span>
//                 </h3>
//               </Hall_price>
//             </Hall_info>
//           </Hall_card>
//         ))}
//       </Halls_container>
//     </Container>
//   );
// };

// export default Halls;
// const Hall_price = styled.div`
//   display: flex;
//   margin-top: -10px;
//   gap: 5px;
//   h3 {
//     font-size: 17px;
//     font-weight: 700;
//     color: #603379;
//   }
// `;
// const Hall_rating = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
//   padding: 0.15rem 0.8rem;
//   border-radius: 0.375rem;
    
//   @media (max-width: 1024px) {
    
//   }

//   @media (max-width: 768px) {

//   }

//   @media (max-width: 480px) {
    
//   }
// `;
// const Hall_header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   padding-top: 15px;
//   h3 {
//     font-size: 1.125rem;
//     font-weight: 600;
//     color: #1f2937;
//     margin: 0;
//     color: #0a0a0a;
//     font-size: 1rem;
//   }
// `;
// const Hall_info = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   p {
//     font-size: 15px;
//     color: #545454;
//     margin: 0 0 0.5rem 0;
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
// const Image_holder = styled.div`
//   position: relative;
//   width: 290px;
//   height: 290px;
//   overflow: hidden;
//   border-radius: 14px;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.9s;
//     border-radius: 14px;
//   }
//   &:hover img {
//     transform: scale(1.05);
//   }
// `;
// const Feature_badge = styled.div`
//   position: absolute;
//   top: 1rem;
//   left: 1rem;
//   background-color: #fbbe24;
//   color: #1f2937;
//   padding: 0.5rem 0.75rem;
//   border-radius: 2rem;
//   display: flex;
//   align-items: center;
//   height: 0.5rem;
//   gap: 0.25rem;
//   font-size: 0.75rem;
//   font-weight: 600;
//   z-index: 1;
// `;
// const Hall_card = styled.div`
//   width: 320px;
//   flex-direction: column;
// `;
// const Halls_container = styled.div`
//   display: flex;
//   gap: 20px;
//   width: 95%;
//   height: 100%;
//   margin: 0 auto;

    
//   @media (max-width: 1024px) {
    
//   }

//   @media (max-width: 768px) {

//   }

//   @media (max-width: 480px) {
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//   }
// `;
// const Container = styled.div`
//   width: 100%;
//   margin: 0 auto;
//   text-align: center;
//   padding-top: 2rem;
//   background-color: #ffffff;
//   height: 100%;
//   h2 {
//     text-align: center;
//     font-size: 1.875rem;
//     font-weight: bold;
//     color: #1a1a1a;
//     margin-bottom: 3px;
//   }
//   p {
//     font-size: 1.25rem;
//     color: #4b5563;
//   }
// `;

import { Heart, Sparkle, Star } from "lucide-react";
import styled from "styled-components";

const halls = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dg9hdp34k/image/upload/v1761301025/Fea1_jegvae.jpg",
    name: "Versatile Events Center",
    location: "Ikeja GRA, Lagos",
    guests: "200-500 guests",
    price: "₦420,000",
    rating: 5.0,
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dg9hdp34k/image/upload/v1761301025/Fea2_qmo6dv.jpg",
    name: "Imperial Marquee Hall",
    location: "Ajah, Lagos",
    guests: "400-700 guests",
    price: "₦480,000",
    rating: 4.8,
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dg9hdp34k/image/upload/v1761301025/Fea3_dqarue.jpg",
    name: "Skyline Rooftop Venue",
    location: "Ikoyi, Lagos",
    guests: "200-400 guests",
    price: "₦600,000",
    rating: 4.8,
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dg9hdp34k/image/upload/v1761301026/Fea4_yfdkeu.jpg",
    name: "Lush Garden Paradise",
    location: "Lekki Phase 1, Lagos",
    guests: "300-600 guests",
    price: "₦550,000",
    rating: 4.7,
  },
];

const Halls = () => {
  return (
    <Container>
      <h2>Featured Event Halls</h2>
      <p>Discover our handpicked selection of premium venues</p>

      <Halls_container>
        {halls.map((hall) => (
          <Hall_card key={hall.id}>
            <Image_holder>
              <img src={hall.image} alt={hall.name} />
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
                <h3>{hall.name}</h3>
                <Hall_rating>
                  <Star
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#fbbf24",
                      fill: "#fbbf24",
                    }}
                  />
                  <span>{hall.rating}</span>
                </Hall_rating>
              </Hall_header>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#1f2937",
                  marginTop: "5px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                {hall.location}
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#1f2937",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                {hall.guests}
              </p>

              <Hall_price>
                <h3>
                  {hall.price} <span>/day</span>
                </h3>
              </Hall_price>
            </Hall_info>
          </Hall_card>
        ))}
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
    font-size: 15px;
    color: #545454;
    margin: 0 0 0.5rem 0;
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
  gap: 15px;
  width: 100%;
  height: 100%;

justify-content: center;
align-items: center;


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
    color: #4b5563;
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