import { Search, Upload, Zap } from "lucide-react";
import styled from "styled-components";

const How_it_works = () => {
  return (
    <Section>
      <Container>
        <h2>How Evently Works</h2>

        <Steps_container>
          <Step>
            <Icon_wrapper>
              <Icon_circle>
                <Upload
                  style={{
                    width: "28px",
                    height: "28px",
                    color: "#9810FA",
                  }}
                />
              </Icon_circle>
              <Step_number>1</Step_number>
            </Icon_wrapper>
            <h4>List Your Hall</h4>
            <p>Hall owners upload hall details, images, and pricing.</p>
          </Step>

          <Step>
            <Icon_wrapper>
              <Icon_circle>
                <Search
                  style={{
                    width: "28px",
                    height: "28px",
                    color: "#9810FA",
                  }}
                />
              </Icon_circle>
              <Step_number>2</Step_number>
            </Icon_wrapper>
            <h4>Discover Spaces</h4>
            <p>Organisers browse trusted, verified halls.</p>
          </Step>

          <Step>
            <Icon_wrapper>
              <Icon_circle>
                <Zap
                  style={{
                    width: "28px",
                    height: "28px",
                    color: "#9810FA",
                  }}
                />
              </Icon_circle>
              <Step_number>3</Step_number>
            </Icon_wrapper>
            <h4>Book Instantly</h4>
            <p>Secure your date and receive instant confirmation.</p>
          </Step>
        </Steps_container>
      </Container>
    </Section>
  );
};

export default How_it_works;

const Section = styled.div`
  background-color: #f5f5f5;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 50px 20px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const Container = styled.div`
  // max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 2rem;

  h2 {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 60px;
    letter-spacing: -0.5px;

    @media (max-width: 768px) {
      font-size: 1.75rem;
      margin-bottom: 50px;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
      margin-bottom: 40px;
    }
  }
`;

const Steps_container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 968px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    gap: 2.5rem;
    max-width: 100%;
  }
`;

const Step = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
  }

  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 12px;
    margin-top: 0;

    @media (max-width: 480px) {
      font-size: 1.0625rem;
    }
  }

  p {
    font-size: 0.9375rem;
    color: #4a4a4a;
    line-height: 1.6;
    max-width: 280px;
    margin: 0;

    @media (max-width: 768px) {
      max-width: 100%;
    }

    @media (max-width: 480px) {
      font-size: 0.875rem;
      line-height: 1.5;
    }
  }
`;

const Icon_wrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
  }
`;

const Icon_circle = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f3e8ff;
  border: 2px solid #e0aa3d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(152, 16, 250, 0.15);
  }

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
  }

  @media (max-width: 360px) {
    width: 65px;
    height: 65px;
  }
`;

const Step_number = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  background-color: #9810fa;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(152, 16, 250, 0.3);

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    font-size: 0.875rem;
    top: -6px;
    right: -6px;
  }

  @media (max-width: 360px) {
    width: 26px;
    height: 26px;
    font-size: 0.8125rem;
  }
`;
