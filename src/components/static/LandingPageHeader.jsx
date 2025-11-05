

import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SignupDropdown from "./signupDropdown/SignupDropdown";

const LandingpageHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Container>
      <NavContent>
        <Logo onClick={() => navigate("/")}>Eventiq</Logo>

        {/* Hamburger Icon */}
        <Hamburger onClick={toggleMenu}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </Hamburger>

        {/* Nav Links */}
        <NavLinks isOpen={isOpen}>
          <StyledLinks>
          <StyledLink to="home" smooth duration={600} onClick={() => setIsOpen(false)}>
            Home
          </StyledLink>
          <StyledLink to="about" smooth duration={600} onClick={() => setIsOpen(false)}>
            About
          </StyledLink>
          <StyledLink to="faq" smooth duration={600} onClick={() => setIsOpen(false)}>
            FAQ
          </StyledLink>
           </StyledLinks>

          <SignupDropdownWrapper>
            <SignupDropdown />
                    <Login_Button onClick={() => navigate("/login")}>
            Log In
          </Login_Button>
          </SignupDropdownWrapper>
</NavLinks>
  
       
      </NavContent>
    </Container>
  );
};

export default LandingpageHeader;



const Container = styled.header`

  position: fixed;
  top: 0;
  width:100%;
  background-color: #292929;
  z-index: 50;
  border-bottom: 1px solid #e0aa3d;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavContent = styled.div`

 width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
   font-family: "Brush Script MT", cursive;
  font-size: 32px;
  color: #fff;
  font-weight: 400;
  font-style: italic;
  margin-top: -5px;
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    color: white;
  }
  @media (max-width: 480px) {
   display: block;
    color: white;
  }

`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 15rem;




  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    flex-direction: column;
    background: #ffffff;
    width: 100%;
    height: calc(100vh - 70px);
   
    gap: 2rem;
    transition: right 0.35s ease-in-out;
    box-shadow: ${({ isOpen }) =>
      isOpen ? "0 0 20px rgba(0, 0, 0, 0.2)" : "none"};
  }

  


 @media (max-width: 1024px) {
   gap: 5rem;
`;

const StyledLink = styled(Link)`
  font-size: 1rem;
  color: #ffff;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
     color: #603379;
    cursor: pointer;
  }

    @media (max-width: 768px) {
   
    color: #292929;
     font-size: 1.5rem;
margin-top: 30px;
   margin-right: 250px;
  }

  @media (max-width: 480px) {
   color: #292929;
margin-top: 30px;
    text-align: left;
  }
`;

const StyledLinks = styled.div`

display: flex;
gap: 6rem;

   @media (max-width: 768px) {
 gap: 1rem;
  flex-direction: column;
  }

  @media (max-width: 1024px) {
  
gap: 1rem;
  }

`;
const SignupDropdownWrapper = styled.div`
   display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 1rem;
    flex-direction: column;
    margin-right: 200px;
  }

    @media (max-width: 480px) {
    margin-top: 1rem;
    flex-direction: column;
    margin-right: 200px;
  }
`;



const Login_Button = styled.button`
  padding: 0.75rem 1.5rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  background-color: #374151;
  border: 1px solid #e0aa3d;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9cf9c;
    color: #374151;
  }

  @media (max-width: 768px) {
    width: 80%;
    font-size: 0.95rem;
    padding: 0.75rem 1rem;
    text-align: center;
    margin-right: 25px;
  }

  @media (max-width: 480px) {
    width: 90%;
    font-size: 0.9rem;
    padding: 0.7rem 0.9rem;
     margin-right: 10px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
