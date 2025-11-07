import { CheckCircle2 } from "lucide-react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Event_section = () => {
  const img =
    "https://res.cloudinary.com/dg9hdp34k/image/upload/v1762324583/evver_y7eeue.jpg";

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
          <Link to="/signup-individual" className="link">
            <Button>Sign Up as a Client</Button>
          </Link>
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

  .link {
    text-decoration: none;
    color: inherit;
    font-size: 0.9rem;

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }
`;
