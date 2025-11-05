import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Table, Building2, TreePine, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useArea } from "../../assets/AreaContext/AreaContext";

const Individual_subHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const { selectedArea, setSelectedArea } = useArea();

  const isActive = (path) => location.pathname === path;

  const areas = [
    "All Areas",
    "Victoria Island",
    "Lekki",
    "Ikeja",
    "Yaba",
    "Ikoyi",
    "Surulere",
    "Ajah",
    "Maryland",
    "Festac",
    "Apapa",
    "Agege/Ogba",
  ];

  const iconMap = {
    "all-venues": Table,
    "indoor-halls": Building2,
    "outdoor-halls": TreePine,
    multipurpose: Table,
  };

  const getIcon = (type) => {
    const IconComponent = iconMap[type];
    return IconComponent ? <IconComponent size={25} /> : null;
  };

  return (
    
    <SubHeaderContainer>
      <SubHeaderContent>
        {/* Navigation buttons */}
        <NavButton
          active={isActive("/individual-dashboard")}
          onClick={() => navigate("/individual-dashboard")}
        >
          <IconWrapper>{getIcon("all-venues")}</IconWrapper>
          <Label>All Venues</Label>
        </NavButton>
        <NavButton
          active={isActive("/individual-dashboard/indoor")}
          onClick={() => navigate("/individual-dashboard/indoor")}
        >
          <IconWrapper>{getIcon("indoor-halls")}</IconWrapper>
          <Label>Indoor Halls</Label>
        </NavButton>
        <NavButton
          active={isActive("/individual-dashboard/outdoor")}
          onClick={() => navigate("/individual-dashboard/outdoor")}
        >
          <IconWrapper>{getIcon("outdoor-halls")}</IconWrapper>
          <Label>Outdoor Venues</Label>
        </NavButton>
        <NavButton
          active={isActive("/individual-dashboard/multipurpose")}
          onClick={() => navigate("/individual-dashboard/multipurpose")}
        >
          <IconWrapper>{getIcon("multipurpose")}</IconWrapper>
          <Label>Multipurpose</Label>
        </NavButton>

        {/* Filter dropdown */}
        <FilterSection>
          <FilterButton
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            isOpen={isDropdownOpen}
          >
            <MapPin size={18} />
            <span>{selectedArea}</span> {/* ✅ Show selected area */}
            <ChevronIcon isOpen={isDropdownOpen}>
              <ChevronDown size={16} />
            </ChevronIcon>
          </FilterButton>

          {isDropdownOpen && (
            <DropdownMenu>
              {areas.map((area, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => {
                    setSelectedArea(area); // ✅ Save selected area
                    setIsDropdownOpen(false);
                  }}
                >
                  {area}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </FilterSection>
      </SubHeaderContent>
    </SubHeaderContainer>
  );
};

export default Individual_subHeader;


const SubHeaderContainer = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #9d9d9d;
  padding: 0 4rem;
  
  position: sticky;
  top: 95px;
  z-index: 99;

  @media (max-width: 1024px) {
    padding: 0 2rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
    top: 100px;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
    top: 80px;
  }
`;

const SubHeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-top: 1em;
  padding-bottom: 1rem;

  @media (max-width: 1024px) {
    gap: 1rem;
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 480px) {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: none;
  border: 2px solid ${(props) => (props.active ? "#6b46c1" : "transparent")};
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${(props) => (props.active ? "#6b46c1" : "#6b7280")};
  transition: all 0.3s ease;
  white-space: nowrap;
  background-color: ${(props) => (props.active ? "#f3e8ff" : "transparent")};
  flex-shrink: 0;

  @media (max-width: 1024px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.6rem;
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.5rem;
    min-width: 70px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;

  svg {
    @media (max-width: 768px) {
      width: 20px;
      height: 20px;
    }

    @media (max-width: 480px) {
      width: 18px;
      height: 18px;
    }
  }
`;

const Label = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #0a0a0a;

  @media (max-width: 1024px) {
    font-size: 0.7rem;
  }

  @media (max-width: 768px) {
    font-size: 0.65rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const FilterSection = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin-left: 0.5rem;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.isOpen ? "#f3e8ff" : "#f3f4f6")};
  border: 2px solid ${(props) => (props.isOpen ? "#6b46c1" : "#e5e7eb")};
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: ${(props) => (props.isOpen ? "#6b46c1" : "#374151")};
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => (props.isOpen ? "#f3e8ff" : "#e5e7eb")};
    border-color: ${(props) => (props.isOpen ? "#6b46c1" : "#d1d5db")};
  }

  @media (max-width: 1024px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.5rem;
    font-size: 0.75rem;

    span {
      display: none;
    }
  }

  svg {
    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }
  }
`;

const ChevronIcon = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  color: inherit;

  svg {
    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
  width: 12rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  overflow: hidden;
  max-height: 300px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 10rem;
    max-height: 250px;
  }

  @media (max-width: 480px) {
    width: 9rem;
    max-height: 200px;
    right: -1rem;
  }
`;

const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  color: #374151;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f3e8ff;
    color: #6b46c1;
  }

  &:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
`;
