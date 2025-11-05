import { DollarSign, Headphones, ShieldCheck, Zap } from "lucide-react";
import styled from "styled-components";

const Why_choose = () => {
  const features = [
    {
      icon: <ShieldCheck size={32} color="#9810FA" />,
      title: "Verified Listings Only",
      desc: "All venues are verified for quality and authenticity.",
    },
    {
      icon: <DollarSign size={32} color="#9810FA" />,
      title: "Transparent Pricing",
      desc: "No hidden fees. See exactly what you pay upfront.",
    },
    {
      icon: <Zap size={32} color="#9810FA" />,
      title: "Instant Booking",
      desc: "Send booking requests and get confirmed instantly.",
    },
    {
      icon: <Headphones size={32} color="#9810FA" />,
      title: "Local Support",
      desc: "Dedicated support team to help manage your events.",
    },
  ];
  return (
    <Container>
      <h2>Why Choose Eventiq?</h2>
      <Features>
        {features.map((feature, index) => (
          <Feature_card key={index}>
            <Icon_box>{feature.icon}</Icon_box>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </Feature_card>
        ))}
      </Features>
    </Container>
  );
};

export default Why_choose;

const Icon_box = styled.div`
  background: #f3e8ff;
  width: 3.125rem;
  height: 3.125rem;
  margin: 0 auto 1rem auto;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -2px;

  @media (max-width: 768px) {
    width: 2.75rem;
    height: 2.75rem;

    svg {
      width: 28px;
      height: 28px;
    }
  }

  @media (max-width: 480px) {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.875rem;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const Feature_card = styled.div`
  background: #fff;
  border: 1px solid #e0aa3d;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  text-align: left;
  width: 14.5rem;
  height: 13.9167rem;

  &:hover {
    box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.08);
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #292929;
    line-height: 1.6;
    font-weight: 500;
    margin-top: 1rem;
  }

  @media (max-width: 1024px) {
    width: calc(50% - 0.75rem);
    min-width: 280px;
    height: auto;
    min-height: 13rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    padding: 1.5rem 1.25rem;

    h3 {
      font-size: 1.125rem;
    }

    p {
      font-size: 0.9375rem;
      margin-top: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1.25rem 1rem;
    border-radius: 0.75rem;
    min-height: auto;

    h3 {
      font-size: 1.0625rem;
      margin-bottom: 0.375rem;
    }

    p {
      font-size: 0.875rem;
      line-height: 1.5;
      margin-top: 0.625rem;
    }
  }
`;

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  max-width: 80.75rem;
  margin: 0 auto;

  @media (max-width: 1024px) {
    gap: 1.25rem;
    max-width: 900px;
  }

  @media (max-width: 768px) {
    gap: 1.25rem;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

const Container = styled.div`
  background-color: #f3f4f6;
  padding: 5rem 1.25rem;
  text-align: center;


  h2 {
    font-size: 1.875rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 3.125rem;
  }

  @media (max-width: 768px) {
    padding: 3.5rem 1rem;

    h2 {
      font-size: 1.625rem;
      margin-bottom: 2.5rem;
    }
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1rem;

    h2 {
      font-size: 1.375rem;
      margin-bottom: 2rem;
    }
  }
`;
