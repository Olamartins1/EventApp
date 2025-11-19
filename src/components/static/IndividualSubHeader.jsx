import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Table, Building2, TreePine, MapPin, ChevronDown,NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import { useArea } from "../../assets/AreaContext/AreaContext";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../assets/AuthContext/AuthContext";

const Individual_subHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { selectedArea, setSelectedArea } = useArea();
const storedArea = JSON.parse(localStorage.getItem("All area"));

  const isActive = (path) => location.pathname === path;
  const {token} = useContext(AuthContext)

  const [areas,setAreas] = useState([])


  // const areas = [
  //   "All Areas",
  //   "Victoria Island",
  //   "Lekki",
  //   "Ikeja",
  //   "Yaba",
  //   "Ikoyi",
  //   "Surulere",
  //   "Ajah",
  //   "Maryland",
  //   "Festac",
  //   "Apapa",
  //   "Agege/Ogba",
  // ];


  useEffect(() => {
    const fetchArea = async () => {
      try {
        const response = await axios.get(`https://eventiq-final-project.onrender.com/api/v1/cities`,
            {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
setAreas(["All Areas", ...response.data.data]);
      } catch (err) {
        console.log("Error fetching venues:", err);
    };
  }
    fetchArea();
  }, []);
  

console.log("area",areas)
  const iconMap = {
    "all-venues": Table,
    "indoor-halls": Building2,
    "outdoor-halls": TreePine,
    multipurpose: Table,
    "booking": NotebookPen ,

  };

  const getIcon = (type) => {
    const IconComponent = iconMap[type];
    return IconComponent ? <IconComponent size={25} /> : null;
  };
  const myArea = () => {
    localStorage.setItem("myArea", JSON.stringify(selectedArea));
  };
  return (
    <SubHeaderContainer>
      <SubHeaderContent>
        <NavButtonsWrapper>
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
            <Label>Outdoor</Label>
          </NavButton>
          <NavButton
            active={isActive("/individual-dashboard/multipurpose")}
            onClick={() => navigate("/individual-dashboard/multipurpose")}
          >
            <IconWrapper>{getIcon("multipurpose")}</IconWrapper>
            <Label>Multipurpose</Label>
          </NavButton>
             <NavButton
            active={isActive("/individual-dashboard/myBooking")}
            onClick={() => navigate("/individual-dashboard/myBooking")}
          >
            <IconWrapper>{getIcon("booking")}</IconWrapper>
            <Label>My Bookings</Label>
          </NavButton>

          {/* Filter dropdown - desktop position */}
          <FilterSection className="desktop-filter">
            <FilterButton
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              isOpen={isDropdownOpen}
            >
              <MapPin size={18} />
              <span>{selectedArea}</span>
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
                      myArea;
                      setSelectedArea(area);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {area}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </FilterSection>
        </NavButtonsWrapper>

        <FilterSection className="mobile-filter">
          <FilterButton
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            isOpen={isDropdownOpen}
          >
            <MapPin size={18} />
            <span>{selectedArea}</span>
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
                     localStorage.setItem("All area", JSON.stringify(area));
                    setSelectedArea(area);
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
  border-bottom: 1px solid #e5e7eb;
  top: 95px;
  margin-top: 6%;
  z-index: 99;

  @media (max-width: 1024px) {
    padding: 0 2rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
    top: 100px;
  }

  @media (max-width: 480px) {
    padding: 0;
    margin-top: 18%;
    z-index: 99;
  }
`;

const SubHeaderContent = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 1rem 0;

  @media (max-width: 1024px) {
    padding: 0.75rem 0;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    gap: 0;
  }

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;

const NavButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 0.75rem;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 0.75rem 1rem;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 480px) {
    gap: 0.2rem;
    // padding: 0.75rem 1rem;
    justify-content: center;
  }
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${(props) => (props.active ? "#6b46c1" : "#6b7280")};
  transition: all 0.2s ease;
  white-space: nowrap;
  background-color: ${(props) => (props.active ? "#f3e8ff" : "transparent")};
  flex-shrink: 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -1rem;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${(props) => (props.active ? "#6b46c1" : "transparent")};
    transition: background-color 0.2s ease;

    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    gap: 0.4rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    gap: 0.3rem;
    min-width: 80px;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
    min-width: 70px;
    gap: 0.2rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;

  svg {
    @media (max-width: 768px) {
      width: 22px;
      height: 22px;
    }

    @media (max-width: 480px) {
      width: 20px;
      height: 20px;
    }
  }
`;

const Label = styled.span`
  font-size: 0.813rem;
  font-weight: 500;
  color: inherit;

  @media (max-width: 1024px) {
    font-size: 0.75rem;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

const FilterSection = styled.div`
  position: relative;
  flex-shrink: 0;

  /* Desktop version - inline with nav buttons */
  &.desktop-filter {
    margin-left: auto;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
      display: none;
    }
  }

  /* Mobile version - separate row below nav buttons */
  &.mobile-filter {
    display: none;

    @media (max-width: 768px) {
      display: flex;
      width: 100%;
      justify-content: center;
      padding: 0 1rem 0.75rem 1rem;
      border-top: 1px solid #f3f4f6;
    }

    @media (max-width: 480px) {
      padding: 0 1rem 0.75rem 1rem;
      height: 60px;
    }
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.isOpen ? "#f3e8ff" : "transparent")};
  border: 1px solid ${(props) => (props.isOpen ? "#6b46c1" : "#d1d5db")};
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: ${(props) => (props.isOpen ? "#6b46c1" : "#374151")};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => (props.isOpen ? "#f3e8ff" : "#f9fafb")};
  }

  @media (max-width: 1024px) {
    padding: 0.45rem 0.85rem;
    font-size: 0.813rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.813rem;
    gap: 0.5rem;
    width: 100%;
    max-width: 100%;
    justify-content: center;
  }

  @media (max-width: 480px) {
    padding: 0.45rem 0.75rem;
    font-size: 0.75rem;
    gap: 0.4rem;
  }

  svg {
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }

    @media (max-width: 480px) {
      width: 15px;
      height: 15px;
    }
  }
`;

const ChevronIcon = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  color: inherit;
  flex-shrink: 0;

  svg {
    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
    }

    @media (max-width: 480px) {
      width: 12px;
      height: 12px;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  width: 12rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 100;
  overflow: hidden;
  max-height: 300px;
  overflow-y: auto;

  @media (max-width: 768px) {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: calc(100% - 2rem);
    max-width: 280px;
    max-height: 250px;
  }

  @media (max-width: 480px) {
    max-width: 240px;
    max-height: 200px;
  }
`;

const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.625rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3e8ff;
    color: #6b46c1;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.813rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.65rem;
    font-size: 0.75rem;
  }
`;
