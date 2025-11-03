
import { CheckCircle2 } from "lucide-react";
import styled from "styled-components";

const Event_section = () => {
  return (
    <Section>
      <Event_text>
        <h2>Find the Perfect Space for Any Event</h2>
        <p>
          From weddings to conferences, discover halls that fit your style and
          budget. Browse verified venues, compare options, and book with
          confidence.
        </p>

        <Event_features>
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
        </Event_features>
        <Button>Sign Up as Individual</Button>
      </Event_text>

      <Event_image>
        <img src={event} alt="Event hall" />
      </Event_image>
    </Section>
  );
};

export default Event_section;
const Event_image = styled.div`
  border-radius: 0.75rem;
  width: 550px;
  overflow: hidden;
  height: 500px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Button = styled.button`
  background-color: #603379;
  color: #fff;
  border: none;
  padding: 0.9rem 1.8rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background-color: #3f1953;
  }
`;
const Event_features = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2.5rem;
  li {
    font-size: 1rem;
    color: #292929;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
  }
`;
const Event_text = styled.div`
  flex: 1;
  max-width: 540px;
  h2 {
    font-size: 1.875rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
  }
  p {
    font-size: 1rem;
    color: #292929;
    line-height: 1.6;
    margin-bottom: 2rem;
    font-weight: 500;
  }
`;
const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 6rem;
  gap: 5rem;
  background-color: #f3f4f6;
`;
