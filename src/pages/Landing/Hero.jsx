import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
import SignupModal from "../../components/static/signupModal/signupModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    if (user) {
      // User is logged in - navigate to their dashboard
      if (user.role === "venue-owner") {
        navigate("/dashboardHomed"); // Replace with your actual venue owner dashboard route
      } else if (user.role === "client" || user.role === "customer") {
        navigate("/individual-dashboard"); // Replace with your actual client dashboard route
      } else {
        // Default dashboard or handle other roles
        navigate("/dashboard");
      }
    } else {
      // User is not logged in - open signup modal
      openModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      <Container id="home">
        <Video autoPlay loop muted playsInline>
          <source
            src="https://res.cloudinary.com/depuy7bkr/video/upload/v1761914604/VID-20251027-WA0002_video_evenitq_mwoige.mp4"
            type="video/mp4"
          />
        </Video>
        <Overlay></Overlay>

        <Hero_content>
          <h1>Find, Book, and Manage Event Halls with Ease</h1>
          <p>
            Eventiq connects hall owners and event organisers in one seamless
            experience.
          </p>
          <Button onClick={handleButtonClick}>
            {user ? "Back to Dashboard" : "Get Started"}
          </Button>
        </Hero_content>
      </Container>
      {isModalOpen && <SignupModal onClose={closeModal} />}
    </>
  );
};

export default Hero;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #603379;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  margin-top: 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #4a2660;
    transform: scale(1.05);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9375rem;
    margin-top: 1.25rem;
    width: 100%;
    max-width: 280px;
  }
`;

const Hero_content = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 1.5rem;
  max-width: 56rem;
  margin-top: 5rem;

  h1 {
    font-size: 3.5rem;
    font-weight: bold;
    color: white;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }

  p {
    font-size: 1.25rem;
    color: #ffffff;
    margin-bottom: 2rem;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  @media (max-width: 1024px) {
    max-width: 48rem;
    margin-top: 4rem;

    h1 {
      font-size: 2.75rem;
    }

    p {
      font-size: 1.125rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0 1.25rem;
    max-width: 90%;
    margin-top: 3rem;

    h1 {
      font-size: 2.25rem;
      margin-bottom: 1.25rem;
    }

    p {
      font-size: 1rem;
      margin-bottom: 1.5rem;
      max-width: 100%;
    }
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
    margin-top: 2rem;

    h1 {
      font-size: 1.75rem;
      margin-bottom: 1rem;
      line-height: 1.3;
    }

    p {
      font-size: 0.9375rem;
      margin-bottom: 1.25rem;
      line-height: 1.5;
    }
  }

  @media (max-width: 360px) {
    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.875rem;
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.658);
  z-index: 1;

  @media (max-width: 768px) {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.531), #000);

  @media (max-width: 768px) {
    object-position: center;
  }
`;

const Container = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 100px;
  padding-bottom: 130px;
  

  @media (max-width: 1024px) {
    padding-top: 80px;
    padding-bottom: 100px;
  }

  @media (max-width: 768px) {
    padding-top: 70px;
    padding-bottom: 80px;
    min-height: calc(100vh - 60px);
  }

  @media (max-width: 480px) {
    padding-top: 60px;
    padding-bottom: 60px;
    min-height: calc(100vh - 60px);
  }

  @media (max-width: 896px) and (orientation: landscape) {
    padding-top: 40px;
    padding-bottom: 40px;
    min-height: 100vh;
  }
`;