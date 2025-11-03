import { Search, Upload, Zap } from "lucide-react";
import styled from "styled-components";

const How_it_works = () => {
  return (
    <Section>
      <Container>
        <h2>How Eventiq Works</h2>

        <Steps_container>
          <Step>
            <Icon_wrapper>
              <Icon_circle>
                <Upload
                  style={{
                    width: "32px",
                    height: "32px",
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
                    width: "32px",
                    height: "32px",
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
                    width: "32px",
                    height: "32px",
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
  font-weight: bold;
  font-size: 1rem;
`;
const Icon_circle = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f3e8ff;
  border: 1px solid #e0aa3d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon_wrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;
const Step = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 5px;
  }
  p {
    font-size: 1rem;
    color: #292929;
    line-height: 1.6;
    max-width: 280px;
  }
`;
const Steps_container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 4rem;
  h2 {
    text-align: center;
    font-size: 1.875rem;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 80px;
  }
`;
const Section = styled.div`
  background-color: #f3f4f6;
  padding: 50px;
`;
