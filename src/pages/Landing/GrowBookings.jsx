import { CheckCircle2 } from "lucide-react";
import styled from "styled-components";

const Grow_booking = () => {
  const img =
    "https://res.cloudinary.com/dg9hdp34k/image/upload/v1762335900/err_vyusyq.jpg";

  return (
    <Section id="about">
      <Container>
        <Image>
          <img src={img} alt="Event hall" />
        </Image>

        <Grow_content>
          <h2>Grow Your Bookings with Eventiq</h2>
          <p>
            List your space, get discovered by thousands of event organisers,
            and manage everything in one place. It's free to list, and you only
            pay when you get bookings.
          </p>

          <Grow_points>
            <li>
              <CheckCircle2 size={18} color="#9810FA" />
              <span>Easy venue listing and management</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="#9810FA" />
              <span>Reach thousands of potential clients</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="#9810FA" />
              <span>Reach premium clientele</span>
            </li>
          </Grow_points>
          <Button>Sign Up as Venue Owner</Button>
        </Grow_content>
      </Container>
    </Section>
  );
};

export default Grow_booking;

const Button = styled.div`
  background-color: #603379;
  color: #fff;
  border: none;
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 200px;
  text-align: left;

  &:hover {
    background-color: #3f1953;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9375rem;
  }
`;

const Grow_points = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2.5rem;
  font-weight: 500;

  li {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #111827;
  }

  @media (max-width: 480px) {
    margin-bottom: 2rem;

    li {
      font-size: 0.9375rem;
      gap: 0.5rem;
    }
  }
`;

const Grow_content = styled.div`
  flex: 1;
  max-width: 33.75rem;

  h2 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #292929;
    margin-bottom: 2rem;
    line-height: 1.6;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    max-width: 100%;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.9375rem;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.375rem;
      margin-bottom: 0.875rem;
    }

    p {
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const Image = styled.div`
  border-radius: 0.75rem;
  width: 650px;
  overflow: hidden;
  height: 500px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1024px) {
    width: 550px;
    height: 420px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 280px;
    border-radius: 0.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 75rem;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 4rem;

  @media (max-width: 1024px) {
    gap: 3rem;
  }

  @media (max-width: 768px) {
    gap: 2.5rem;
    flex-direction: column;
  }

  @media (max-width: 480px) {
    gap: 2rem;
  }
`;

const Section = styled.div`
  background-color: #fff;
  padding: 5rem 1.25rem;


  @media (max-width: 768px) {
    padding: 3.5rem 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1rem;
  }
`;


// import { CheckCircle2 } from "lucide-react";
// import styled from "styled-components";

// const Grow_booking = () => {
//   const img =
//     "https://res.cloudinary.com/dg9hdp34k/image/upload/v1762335900/err_vyusyq.jpg";

//   return (
//     <Section id="about">
      
//       <Container>
//         <Image>
//           <img src={img} alt="Event hall" />
//         </Image>
//         <Grow_content>
//           <h2>Grow Your Bookings with Eventiq</h2>
//           <p>
//             List your space, get discovered by thousands of event organisers,
//             and manage everything in one place. It's free to list, and you only
//             pay when you get bookings.
//           </p>

//           <Grow_points>
//             <li>
//               <CheckCircle2 size={18} color="#9810FA" />
//               <span>Easy venue listing and management</span>
//             </li>
//             <li>
//               <CheckCircle2 size={18} color="#9810FA" />
//               <span>Reach thousands of potential clients</span>
//             </li>
//             <li>
//               <CheckCircle2 size={18} color="#9810FA" />
//               <span>Reach premium clientele</span>
//             </li>
//           </Grow_points>
//         </Grow_content>
//     <ButtonWrapper>
//           <Button>Sign Up as Venue Owner</Button>
//         </ButtonWrapper>

    
//       </Container>
//     </Section>
//   );
// };

// export default Grow_booking;

// const ButtonWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;


//   @media (min-width: 769px) {
   
//   }
// `;

// const Button = styled.div`
//   background-color: #603379;
//   color: #fff;
//   border: none;
//   padding: 1rem 2rem;
//   font-size: 1rem;
//   font-weight: 500;
//   border-radius: 0.5rem;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   text-align: center;
//   width: 100%;
//   max-width: 280px;
  

//   &:hover {
//     background-color: #3f1953;
//   }
// `;

// const Grow_points = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin-bottom: 0;
//   font-weight: 400;

//   li {
//     display: flex;
//     align-items: flex-start;
//     gap: 0.75rem;
//     margin-bottom: 0.875rem;
//     font-size: 1rem;
//     color: #4a4a4a;
    
//     &:last-child {
//       margin-bottom: 0;
//     }
    
//     svg {
//       flex-shrink: 0;
//       margin-top: 0.125rem;
//     }
//   }

//   @media (max-width: 768px) {
//     li {
//       font-size: 0.9375rem;
//       gap: 0.625rem;
//       margin-bottom: 0.75rem;
//     }
//   }
// `;

// const Grow_content = styled.div`
//   flex: 1;
//   max-width: 33.75rem;

//   h2 {
//     font-size: 1.875rem;
//     font-weight: 700;
//     color: #1a1a1a;
//     margin-bottom: 1rem;
//     line-height: 1.2;
//     text-align: center;
//   }

//   p {
//     font-size: 1rem;
//     color: #4a4a4a;
//     margin-bottom: 1.75rem;
//     line-height: 1.6;
//     font-weight: 400;
//     text-align: left;
//   }

//   @media (max-width: 768px) {
//     max-width: 100%;

//     h2 {
//       font-size: 1.5rem;
//       margin-bottom: 1rem;
//     }

//     p {
//       font-size: 0.9375rem;
//       margin-bottom: 1.5rem;
//     }
//   }
// `;

// const Image = styled.div`
//   border-radius: 0.75rem;
//   width: 650px;
//   overflow: hidden;
//   height: 500px;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   @media (max-width: 1024px) {
//     width: 550px;
//     height: 420px;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//     max-width: 100%;
//     height: 400px;
//     border-radius: 0.75rem;
//     margin-bottom: 1.5rem;
//   }
// `;

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   max-width: 75rem;
//   margin: 0 auto;
//   flex-wrap: wrap;
//   gap: 4rem;

//   @media (max-width: 1024px) {
//     gap: 3rem;
//   }

//   @media (max-width: 768px) {
//     gap: 0;
//     flex-direction: column;
//     align-items: stretch;
//   }
// `;

// const Section = styled.div`
//   background-color: #fff;
//   padding: 5rem 1.25rem;

//   @media (max-width: 768px) {
//     padding: 3rem 1.25rem;
//   }
// `;