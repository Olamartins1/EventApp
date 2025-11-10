// import { CheckCircle2 } from "lucide-react";
// import styled from "styled-components";

// const Event_section = () => {
//    const img =
//     "https://res.cloudinary.com/dg9hdp34k/image/upload/v1762324583/evver_y7eeue.jpg";
//   return (

//     <Section>

//       <Event_text>
//         <h2>Find the Perfect Space for Any Event</h2>
//         <p>
//           From weddings to conferences, discover halls that fit your style and
//           budget. Browse verified venues, compare options, and book with
//           confidence.
//         </p>

//         <Event_features>
//           <li>
//             <CheckCircle2 size={18} color="#9810FA" />{" "}
//             <span>Browse hundreds of verified venues</span>
//           </li>
//           <li>
//             <CheckCircle2 size={18} color="#9810FA" />{" "}
//             <span> Seamless booking process</span>
//           </li>
//           <li>
//             <CheckCircle2 size={18} color="#9810FA" />{" "}
//             <span>Secure Payment Gateway</span>
//           </li>
//         </Event_features>
//         <Button>Sign Up as Individual</Button>
//      </Event_text>
//   <Image>
//           <img src={img} alt="Event hall" />
//         </Image>
//       {/* <Event_image>
//         <img src={event} alt="Event hall" />
//       </Event_image> */}
//     </Section>

//   );
// };

// export default Event_section;

// const Button = styled.button`
//   background-color: #603379;
//   color: #fff;
//   border: none;
//   padding: 0.875rem 1.75rem;
//   font-size: 1rem;
//   font-weight: 500;
//   border-radius: 0.375rem;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   width: 180px;
//   text-align: center;
//   font-family: poppins;

//   &:hover {
//     background-color: #3f1953;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//     max-width: 280px;
//   }

//   @media (max-width: 480px) {
//     padding: 0.75rem 1.5rem;
//     font-size: 0.9375rem;
//   }
// `;
// const Event_features = styled.ul`
//   // list-style: none;
//   // padding: 0;
//   // margin-bottom: 2.5rem;
//   // li {
//   //   font-size: 1rem;
//   //   color: #292929;
//   //   margin-bottom: 1rem;
//   //   display: flex;
//   //   align-items: center;
//   //   gap: 0.5rem;
//   //   font-weight: 500;
//   // }
//    list-style: none;
//   padding: 0;
//   margin-bottom: 2.5rem;
//   font-weight: 500;

//   li {
//     display: flex;
//     align-items: center;
//     gap: 0.625rem;
//     margin-bottom: 1rem;
//     font-size: 1rem;
//     color: #111827;
//   }

//   @media (max-width: 480px) {
//     margin-bottom: 2rem;

//     li {
//       font-size: 0.9375rem;
//       gap: 0.5rem;
//     }
//   }
// `;
// const Event_text = styled.div`
//   flex: 1;
//   max-width: 540px;

//   h2 {
//     font-size: 1.875rem;
//     font-weight: 600;
//     color: #1a1a1a;
//     margin-bottom: 1.5rem;
//   }
//   p {
//     font-size: 1rem;
//     color: #292929;
//     line-height: 1.6;
//     margin-bottom: 2rem;
//     font-weight: 500;
//   }
//      @media (max-width: 768px) {
//     max-width: 100%;

//     h2 {
//       font-size: 1.5rem;
//     }

//     p {
//       font-size: 0.9375rem;
//     }
//   }

//   @media (max-width: 480px) {
//   margin-top: 50px;
//   margin-left:25px;
//     h2 {
//       font-size: 1.375rem;
//       margin-bottom: 0.875rem;
//     }

//     p {
//       font-size: 0.875rem;
//       margin-bottom: 1.5rem;
//     }
//   }
// `;
// const Section = styled.div`
//   // display: flex;
//   // align-items: center;
//   // justify-content: space-between;
//   // padding: 4rem 6rem;
//   // gap: 5rem;
//   // background-color: #f3f4f6;

//     display: flex;
//   align-items: center;
//   justify-content: center;
//   max-width: 100%;
//   margin: 0 auto;
//   flex-wrap: wrap;
//   gap: 4rem;
//   background-color: #f3f4f6;
// margin-top: -50px;

//     @media (max-width: 1024px) {
//     gap: 3rem;
//   }

//   @media (max-width: 768px) {
//     gap: 2.5rem;
//     flex-direction: column;
//   }

//   @media (max-width: 480px) {
//   margin-top: -20px;
//     gap: 2rem;
//   }
// `;

// const Image = styled.div`
//   // border-radius: 0.75rem;
//   // width: 650px;
//   // overflow: hidden;
//   // height: 500px;

//   // img {
//   //   width: 100%;
//   //   height: 90%;
//   //   object-fit: cover;
//   //   padding: 30px;
//   //  margin-top: -5px;
//   //   border-radius: 1rem;
//   // }

//   // @media (max-width: 1024px) {
//   //   width: 550px;
//   //   height: 420px;
//   // }

//   // @media (max-width: 768px) {
//   //   width: 100%;
//   //   max-width: 500px;
//   //   height: 350px;
//   // }

//   // @media (max-width: 480px) {
//   //   height: 280px;
//   //   border-radius: 0.5rem;
//   //   margin-left: -20px;
//   // }

//  border-radius: 0.75rem;
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
//     max-width: 500px;
//     height: 350px;
//   }

//   @media (max-width: 480px) {
//     height: 280px;
//     border-radius: 0.5rem;
//   }
// `;

import { CheckCircle2 } from "lucide-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Event_section = () => {
  const navigate = useNavigate();

  const img =
    "https://res.cloudinary.com/dg9hdp34k/image/upload/v1762324583/evver_y7eeue.jpg";
  const handleNavigate = () => {
    navigate("/signup-individual");
  };
  return (
    <Event_Section id="about">
      <Event_Container>
        <Event_content>
          <h2>Find the Perfect Space for Any Event</h2>
          <p>
            From weddings to conferences, discover halls that fit your style and
            budget. Browse verified venues, compare options, and book with
            confidence.
          </p>

          <Event_points>
            <li>
              <CheckCircle2 size={18} color="#9810FA" />{" "}
              <span>Browse hundreds of verified venues</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="#9810FA" />{" "}
              <span> Seamless booking process</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="#9810FA" />{" "}
              <span>Secure Payment Gateway</span>
            </li>
          </Event_points>
          <Button onClick={handleNavigate}>Sign Up as a Client</Button>
        </Event_content>
        <Image>
          <img src={img} alt="Event hall" />
        </Image>
      </Event_Container>
    </Event_Section>
  );
};

export default Event_section;

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
  width: 160px;
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

const Event_points = styled.ul`
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

const Event_content = styled.div`
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

const Event_Container = styled.div`
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

const Event_Section = styled.div`
  background-color: #f3f4f6;
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

// const Event_section = () => {
//   const img =
//     "https://res.cloudinary.com/dg9hdp34k/image/upload/v1762324583/evver_y7eeue.jpg";
//   return (
//     <Section>
//       <Event_text>
//         <h2>Find the Perfect Space for Any Event</h2>
//         <p>
//           From weddings to conferences, discover halls that fit your style and
//           budget. Browse verified venues, compare options, and book with
//           confidence.
//         </p>

//         <Event_features>
//           <li>
//             <CheckCircle2 size={20} color="#9810FA" />
//             <span>Browse hundreds of verified venues</span>
//           </li>
//           <li>
//             <CheckCircle2 size={20} color="#9810FA" />
//             <span>Seamless booking process</span>
//           </li>
//           <li>
//             <CheckCircle2 size={20} color="#9810FA" />
//             <span>Secure Payment Gateway</span>
//           </li>
//         </Event_features>
//       </Event_text>

//       <Image>
//         <img src={img} alt="Event hall" />
//       </Image>

//       <ButtonWrapper>
//         <Button>Sign Up as a Client</Button>
//       </ButtonWrapper>
//     </Section>
//   );
// };

// export default Event_section;

// const ButtonWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;

//   @media (min-width: 769px) {
//     display: none;
//   }
// `;

// const Button = styled.button`
//   background-color: #603379;
//   color: #fff;
//   border: none;
//   padding: 0.875rem 1.75rem;
//   font-size: 1rem;
//   font-weight: 500;
//   border-radius: 0.5rem;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   width: 250px;
//   text-align: center;
//   font-family: poppins;

//   &:hover {
//     background-color: #3f1953;
//   }

//   @media (max-width: 768px) {
//     width: calc(100% - 3rem);
//     max-width: 350px;
//     padding: 1rem 2rem;
//     font-size: 1rem;
//     font-weight: 500;
//   }
// `;

// const Event_features = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin-bottom: 2.5rem;
//   font-weight: 500;

//   li {
//     display: flex;
//     align-items: center;
//     gap: 0.625rem;
//     margin-bottom: 1rem;
//     font-size: 1rem;
//     color: #111827;
//   }

//   @media (max-width: 768px) {
//     margin-bottom: 0;
//     margin-top: 1.5rem;

//     li {
//       font-size: 0.875rem;
//       gap: 0.5rem;
//       margin-bottom: 0.75rem;
//       align-items: flex-start;

//       svg {
//         margin-top: 2px;
//         flex-shrink: 0;
//       }
//     }
//   }
// `;

// const Event_text = styled.div`
//   flex: 1;
//   max-width: 540px;

//   h2 {
//     font-size: 1.875rem;
//     font-weight: 700;
//     color: #1a1a1a;
//     margin-bottom: 1.5rem;
//     line-height: 1.3;
//   }

//   p {
//     font-size: 1rem;
//     color: #4a5568;
//     line-height: 1.6;
//     margin-bottom: 2rem;
//     font-weight: 400;
//   }

//   @media (max-width: 768px) {
//     max-width: 100%;
//     padding: 0 1.5rem;
//     width: 100%;

//     h2 {
//       font-size: 1.375rem;
//       margin-bottom: 0.875rem;
//       text-align: left;
//       font-weight: 700;
//       line-height: 1.4;
//     }

//     p {
//       font-size: 0.875rem;
//       margin-bottom: 0;
//       text-align: left;
//       line-height: 1.5;
//       color: #4a5568;
//     }
//   }
// `;

// const Section = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   max-width: 100%;
//   margin: 0 auto;
//   flex-wrap: wrap;
//   gap: 4rem;
//   background-color: #f3f4f6;
//   padding: 4rem 2rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 0;
//     padding: 2.5rem 0;
//     padding-bottom: 2rem;
//     background-color: #f9fafb;
//   }
// `;

// const Image = styled.div`
//   border-radius: 0.75rem;
//   width: 650px;
//   overflow: hidden;
//   height: 500px;

//   img {
//     width: 100%;
//     height: 90%;
//     object-fit: cover;
//     padding: 30px;
//     margin-top: -5px;
//     border-radius: 1rem;
//   }

//   @media (max-width: 1024px) {
//     width: 550px;
//     height: 420px;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//     height: auto;
//     border-radius: 0.75rem;
//     margin: 1.5rem 0 2rem 0;
//     padding: 0 1rem;

//     img {
//       width: 100%;
//       height: auto;
//       aspect-ratio: 16/9;
//       padding: 0;
//       margin: 0;
//       border-radius: 0.75rem;
//       object-fit: cover;
//     }
//   }
// `;
