import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import styled from "styled-components";
import { MdOutlineDashboard, MdOutlineNotifications } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { FiCreditCard, FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from "../../assets/AuthContext/AuthContext";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Overview");
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const menuItems = [
    { name: "Overview", icon: <MdOutlineDashboard />, navigate: "/dashboardHome" },
    { name: "My Venues", icon: <BsBuilding />, navigate: "/dashboardHome/venues" },
    { name: "Payments", icon: <FiCreditCard />, navigate: "/dashboardHome/payments" },
    { name: "Notification", icon: <MdOutlineNotifications />, navigate: "/dashboardHome/notifications" },
    { name: "Profile Setting", icon: <FiSettings />, navigate: "/dashboardHome/settings" },
  ];

  const handleMenuClick = (item) => {
    setActiveItem(item.name);
    navigate(item.navigate);
    setIsOpen(false);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogoutClick = () => setShowLogoutPopup(true);
  const confirmLogout = () => {
    logout();
    setShowLogoutPopup(false);
    navigate("/login");
  };
  const cancelLogout = () => setShowLogoutPopup(false);

  return (
    <>
      <MobileMenuButton onClick={toggleSidebar}>
        {isOpen ? <FiX /> : <FiMenu />}
      </MobileMenuButton>

      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <Container $isOpen={isOpen}>
        <LogoSection>
          <Logo>Eventiq</Logo>
        </LogoSection>

        <MenuList>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              $active={activeItem === item.name || location.pathname === item.navigate}
              onClick={() => handleMenuClick(item)}
            >
              <IconWrapper
                $active={activeItem === item.name || location.pathname === item.navigate}
              >
                {item.icon}
              </IconWrapper>
              <MenuText>{item.name}</MenuText>
            </MenuItem>
          ))}
        </MenuList>

        <LogoutSection>
          <LogoutButton onClick={handleLogoutClick}>
            <IconWrapper>
              <FiLogOut />
            </IconWrapper>
            <MenuText>Logout</MenuText>
          </LogoutButton>
        </LogoutSection>
      </Container>

      {showLogoutPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              background: "#fff",
              width: "360px",
              padding: "2.5rem",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>Leaving Already?</h3>
            <p style={{ color: "#555", marginBottom: "1.5rem" }}>
              Are you sure you want to log out?
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={cancelLogout}
                style={{
                  background: "#ccc",
                  color: "#000",
                  border: "none",
                  padding: "0.7rem 2rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "0.7rem 2rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;


const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #374151;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 1024px) {
    display: flex;
  }
`;

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  pointer-events: ${(props) => (props.$isOpen ? "all" : "none")};
  transition: opacity 0.3s ease;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const Container = styled.div`
  width: 22%;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  background: white;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  transition: transform 0.3s ease;
  z-index: 999;

  @media (max-width: 1024px) {
    width: 280px;
    position: fixed;
    transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
    box-shadow: ${(props) =>
      props.$isOpen ? "2px 0 8px rgba(0, 0, 0, 0.1)" : "none"};
  }

  @media (max-width: 480px) {
    width: 260px;
  }
`;

const LogoSection = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid #f3f4f6;

  @media (max-width: 480px) {
    padding: 20px 16px;
  }
`;

const Logo = styled.h1`
  font-family: "Brush Script MT", cursive;
  font-size: 32px;
  color: purple;
  margin: 0;
  font-weight: 400;
  font-style: italic;

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const MenuList = styled.nav`
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;

  @media (max-width: 480px) {
    padding: 12px 0;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => (props.$active ? "purple" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "#6b7280")};
  margin: 0 12px 4px 12px;
  border-radius: 8px;

  &:hover {
    background-color: ${(props) => (props.$active ? "purple" : "#f3f4f6")};
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    margin: 0 8px 4px 8px;
  }
`;

const MenuText = styled.span`
  font-size: 14px;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const IconWrapper = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: ${(props) => (props.$active ? "white" : "#6b7280")};

  @media (max-width: 480px) {
    font-size: 18px;
    margin-right: 10px;
  }
`;

const LogoutSection = styled.div`
  padding: 20px;
  border-top: 1px solid #f3f4f6;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #ef4444;

  &:hover {
    background-color: #fef2f2;
  }

  ${IconWrapper} {
    color: #ef4444;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
  }
`;
