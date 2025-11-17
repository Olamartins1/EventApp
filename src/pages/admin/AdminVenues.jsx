import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BsBuilding } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { RiHashtag } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
// import { Eye, X } from "lucide-react";
// import VenueCard from "../admin/VenueCard";
import VenueList from "../admin/VenueList";
import { useEffect } from "react";

// const venues2 = [
//   {
//     id: 1,
//     name: "Versatile Events Center",
//     location: "Ikeja GRA, Lagos",
//     capacity: "200-500 guests",
//     price: 420000,
//     date: "15 Oct 2025",
//     image:
//       "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&h=300&fit=crop",
//     verified: false,
//     featured: false,
//   },
//   {
//     id: 2,
//     name: "Imperial Marquee Hall",
//     location: "Ajah, Lagos",
//     capacity: "400-700 guests",
//     price: 485000,
//     date: "18 Oct 2025",
//     image:
//       "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&h=300&fit=crop",
//     verified: false,
//     featured: false,
//   },
//   {
//     id: 3,
//     name: "Mary Slessor",
//     location: "Victoria Island, Lagos",
//     capacity: "300-600 guests",
//     price: 800000,
//     date: "31 Oct 2025",
//     image:
//       "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=300&h=300&fit=crop",
//     verified: false,
//     featured: false,
//   },
//   {
//     id: 4,
//     name: "Skyline Rooftop Venue",
//     location: "Ikeja GRA, Lagos",
//     capacity: "200-400 guests",
//     price: 650000,
//     date: "20 Oct 2025",
//     image:
//       "https://images.unsplash.com/photo-1511578314322-379afb476865?w=300&h=300&fit=crop",
//     verified: true,
//     featured: true,
//   },
// ];

// const tabs = [
//   { id: "all", label: "All", count: 4 },
//   { id: "verified", label: "Verified", count: 1 },
//   { id: "unverified", label: "Unverified", count: 3 },
//   { id: "featured", label: "Featured", count: 1 },
// ];

const AdminVenue = () => {
  const [activeTab, setActiveTab] = useState("all");
  // const [category, setCategory] = useState("");
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);

  const filteredVenues = venues.filter((v) => {
    if (activeTab === "verified") return v.verified;
    if (activeTab === "unverified") return !v.verified;
    // if (activeTab === "pending") return v.pending;
    return true;
  });

  const [stats, setStats] = useState({
    totalVenues: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOverviewStats = async () => {
      try {
        const response = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/overview",

          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;

        setStats({
          totalVenues: data.analysis.totalVenues || 0,
          totalUsers: data.analysis.totalUser || 0,
          totalBookings: data.analysis.totalBookings || 0,
          totalRevenue: data.analysis.totalRevenue || 0,
        });
      } catch (err) {
        console.error("Failed to fetch overview stats:", err);
      }
    };

    fetchOverviewStats();
  }, []);

  const statsData = [
    {
      title: "Total Venues",
      value: stats.totalVenues,
      icon: <BsBuilding />,
      iconBg: "#e9d5ff",
      iconColor: "purple",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FiUsers />,
      iconBg: "#e3e9fa",
      iconColor: "blue",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: <CiCalendar />,
      iconBg: "#e3e9fa",
      iconColor: "blue",
    },
    {
      title: "Total Revenue",
      value: stats.totalRevenue,
      icon: <RiHashtag />,
      iconBg: "#e0cb8c",
      iconColor: "orange",
    },
  ];

  useEffect(() => {
    //   const fetchVenues = async () => {
    //     setLoading(true);
    //     try {
    //       const response = await axios.get(
    //         "https://eventiq-final-project.onrender.com/api/v1/all-listed-venues",
    //         {
    //           headers: {
    //             Accept: "application/json",
    //             Authorization: Bearer ${token},
    //           },
    //         }
    //       );

    //       setVenues(response.data.data || []);
    //       setLoading(false);
    //     } catch (error) {
    //       console.error("Failed to fetch venues:", error);
    //       setLoading(false);
    //     }
    //   };

    //   fetchVenues();
    // }, [token]);

    const fetchVenues = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://eventiq-final-project.onrender.com/api/v1/all-listed-venues",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const mappedVenues = response.data.data.map((v) => ({
          id: v._id,
          name: v.hallName || "Unknown Venue",
          image: v.documents?.images?.[0]?.url || "",
          location: `${v.location.street}, ${v.location.city}, ${v.location.state}`,
          capacity: `${v.capacity.minimum} - ${v.capacity.maximum}`,
          price: v.price || 0,
          date: new Date(v.createdAt).toLocaleDateString(),
          verified: v.verified || false,
          unverified: v.unverified || false,
          // featured: v.featured || false,
          raw: v,
        }));

        setVenues(mappedVenues);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
        setLoading(false);
      }
    };

    fetchVenues();
  }, [token]);

  const tabs = [
    { id: "all", label: "All", count: venues.length },
    {
      id: "verified",
      label: "Verified",
      count: venues.filter((v) => v.verified).length,
    },
    {
      id: "unverified",
      label: "Unverified",
      count: venues.filter((v) => !v.verified).length,
    },
    // {
    //   id: "featured",
    //   label: "Featured",
    //   count: venues.filter((v) => v.featured).length,
    // },
  ];

  return (
    <>
      <Container>
        <Wrapper>
          <WelcomeSection>
            <WelcomeText>Dashboard Overview</WelcomeText>
            <DateText>
              Welcome back! Here's what's happening with your venues.
            </DateText>
          </WelcomeSection>

          <StatsGrid>
            {statsData.map((stat, index) => (
              <StatCard key={index}>
                <StatHeader>
                  <StatTitle>{stat.title}</StatTitle>
                  <StatIcon $bgColor={stat.iconBg} $color={stat.iconColor}>
                    {stat.icon}
                  </StatIcon>
                </StatHeader>
                <StatValue>{stat.value}</StatValue>
              </StatCard>
            ))}
          </StatsGrid>
        </Wrapper>
      </Container>

      <Tababove_Container>
        <MaxWidthWrapper>
          <TabsContainer>
            <TabsWrapper>
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  $active={activeTab === tab.id}
                >
                  <span>{tab.label}</span>
                  <Count>({tab.count})</Count>
                </TabButton>
              ))}
            </TabsWrapper>
          </TabsContainer>

          <VenueList
            venues={filteredVenues}
            venuesData={venues}
            // fetchVenues={fetchVenues}
          />
        </MaxWidthWrapper>
      </Tababove_Container>
    </>
  );
};

export default AdminVenue;

// const Container = styled.div`
//   width: 100%;
//   max-height: 80rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding-top: 30px;

//   background-color: #efebf2;
//   margin-bottom: 75px;

//   @media (max-width: 768px) {
//     padding-top: 20px;
//   }
// `;

// const Wrapper = styled.div`
//   width: 95%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   @media (max-width: 768px) {
//     width: 90%;
//   }
// `;

// const WelcomeSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 10px;
// `;

// const WelcomeText = styled.h2`
//   color: #0a0a0a;
//   font-family: Poppins;
//   font-size: 24px;
//   font-style: normal;
//   font-weight: 500;

//   @media (max-width: 768px) {
//     font-size: 20px;
//   }

//   @media (max-width: 480px) {
//     font-size: 18px;
//   }
// `;

// const DateText = styled.p`
//   color: #717182;
//   font-family: Poppins;
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 24px;
//   @media (max-width: 480px) {
//     font-size: 12px;
//   }
// `;

// const StatsGrid = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-bottom: 32px;
//   margin-top: 30px;
//   width: 100%;
//   justify-content: space-between;

//   @media (max-width: 1024px) {
//     gap: 12px;
//   }

//   @media (max-width: 768px) {
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     gap: 12px;
//     margin-top: 20px;
//     margin-bottom: 24px;
//   }

//   @media (max-width: 480px) {
//     grid-template-columns: 1fr;
//     gap: 10px;
//   }
// `;

// const StatCard = styled.div`
//   background: white;
//   width: 21%;
//   border-radius: 12px;
//   padding: 10px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
//   border: 1px solid #f3f4f6;
//   transition: all 0.2s ease;

//   &:hover {
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
//     transform: translateY(-2px);
//   }

//   @media (max-width: 1024px) {
//     padding: 16px;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//     padding: 16px;
//   }

//   @media (max-width: 480px) {
//     padding: 14px;
//   }
// `;

// const StatHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   margin-bottom: 16px;

//   @media (max-width: 480px) {
//     margin-bottom: 12px;
//   }
// `;

// const StatTitle = styled.h3`
//   color: var(--Black-400, #545454);
//   font-family: Poppins;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 20px;

//   @media (max-width: 480px) {
//     font-size: 13px;
//   }
// `;

// const StatIcon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 10px;
//   background-color: ${(props) => props.$bgColor};
//   color: ${(props) => props.$color};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 20px;
//   flex-shrink: 0;

//   @media (max-width: 480px) {
//     width: 36px;
//     height: 36px;
//     font-size: 18px;
//   }
// `;

// const StatValue = styled.div`
//   color: var(--Black-500, #292929);
//   font-family: Poppins;
//   font-size: 30px;
//   font-style: normal;
//   font-weight: 400;

//   @media (max-width: 768px) {
//     font-size: 28px;
//   }

//   @media (max-width: 480px) {
//     font-size: 24px;
//   }
// `;

// const Tababove_Container = styled.div`
//   // min-height: 100vh;
//   // width: 110%;
//   // background-color: #f9fafb;
//   padding: 1.5rem;
//   background-color: #efebf2;
//   margin-left: -95px;
//   margin-top: -100px;
// `;

// const MaxWidthWrapper = styled.div`
//   max-width: 60rem;
//   margin: 0 auto;
// `;

// const TabsContainer = styled.div`
//   background-color: white;

//   border-radius: 0.5rem;
//   box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//   border: 1px solid #e5e7eb;
//   margin-bottom: 1.5rem;
//   width: 450px;
// `;

// const TabsWrapper = styled.div`
//   display: flex;
//   gap: 0.9rem;
//   padding: 0.25rem;
//   width: 400px;
//   height: 50px;
//   align-items: center;
// `;

// const TabButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.2rem;
//   flex: 1;
//   width: 70px;
//   height: 45px;
//   padding: 0.75rem 1rem;
//   border-radius: 1rem;
//   font-size: 0.875rem;
//   font-weight: 500;
//   transition: all 0.2s ease;
//   border: none;
//   cursor: pointer;
//   background-color: ${(props) => (props.$active ? "#603379" : "transparent")};
//   color: ${(props) => (props.$active ? "white" : "#4b5563")};
//   box-shadow: ${(props) =>
//     props.$active
//       ? "0 4px 10px rgba(96, 51, 121, 0.3)" // purple glow when active
//       : "0 2px 6px rgba(0, 0, 0, 0.08)"}; // soft neutral shadow

//   &:hover {
//     background-color: ${(props) => (props.$active ? "#111827" : "#f3f4f6")};
//     box-shadow: ${(props) =>
//       props.$active
//         ? "0 6px 12px rgba(96, 51, 121, 0.35)"
//         : "0 3px 8px rgba(0, 0, 0, 0.12)"};
//     transform: translateY(-1px);
//   }

//   &:active {
//     transform: translateY(1px);
//     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
//   }
// `;

// const Count = styled.span`
//   font-size: 0.8rem;
//   // opacity: 0.85;
// `;

const Container = styled.div`
  width: 100%;
  max-height: 80rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  background-color: #efebf2;
  margin-bottom: 75px;

  @media (max-width: 1024px) {
    padding-top: 25px;
  }

  @media (max-width: 768px) {
    padding-top: 20px;
    margin-bottom: 50px;
  }

  @media (max-width: 480px) {
    padding-top: 15px;
    margin-bottom: 40px;
  }
`;

const Wrapper = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 95%;
  }
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

// const WelcomeText = styled.h2`
//   color: #0a0a0a;
//   font-family: Poppins;
//   font-size: 24px;
//   font-style: normal;
//   font-weight: 500;

//   @media (max-width: 768px) {
//     font-size: 20px;
//   }

//   @media (max-width: 480px) {
//     font-size: 18px;
//   }
// `;

const WelcomeText = styled.h2`
  color: #0a0a0a;
  font-family: Poppins;
  font-size: 24px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const DateText = styled.p`
  color: #717182;
  font-family: Poppins;
  font-size: 16px;
  line-height: 24px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const StatsGrid = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0 32px 0;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 20px;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    display: flex;
    overflow-x: auto;
    gap: 8px;
    padding-bottom: 8px;
    scroll-snap-type: x mandatory;
    width: 100%;

    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #cfcfcf;
      border-radius: 10px;
    }
  }
`;

const StatCard = styled.div`
  background: white;
  width: 21%;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    padding: 14px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 16px;
  }

  @media (max-width: 480px) {
    min-width: 130px;
    max-width: 130px;
    padding: 10px;
    border-radius: 10px;
    scroll-snap-align: center;
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const StatTitle = styled.h3`
  color: #545454;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
`;

const StatValue = styled.div`
  color: #292929;
  font-family: Poppins;
  font-size: 30px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Tababove_Container = styled.div`
  // min-height: 100vh;
  // width: 110%;
  // background-color: #f9fafb;
  padding: 1.5rem;
  background-color: #efebf2;
  margin-left: -95px;
  margin-top: -100px;
  @media (max-width: 480px) {
    padding: 0.8rem;
    margin-left: 0;
    margin-top: -30px;
  }
`;

const MaxWidthWrapper = styled.div`
  max-width: 60rem;
  margin: 0 auto;

  @media (max-width: 480px) {
    max-width: 60%;
    margin-left: 30px;
  }
`;

const TabsContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
  width: 450px;

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    width: 250px;
  }
`;

const TabsWrapper = styled.div`
  display: flex;
  gap: 0.9rem;
  padding: 0.25rem;
  width: 100%;
  height: 50px;
  align-items: center;
  flex-wrap: wrap; // wraps buttons on mobile
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  flex: 1;
  max-width: 95px;
  height: 40px;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? "#603379" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "#4b5563")};
  box-shadow: ${(props) =>
    props.$active
      ? "0 4px 10px rgba(96, 51, 121, 0.3)"
      : "0 2px 6px rgba(0, 0, 0, 0.08)"};

  &:hover {
    background-color: ${(props) => (props.$active ? "#111827" : "#f3f4f6")};
    box-shadow: ${(props) =>
      props.$active
        ? "0 6px 12px rgba(96, 51, 121, 0.35)"
        : "0 3px 8px rgba(0, 0, 0, 0.12)"};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 480px) {
    flex: 1 1 45%;
    width: 20px;
    font-size: 0.8rem;
    height: 15px;
    padding: 0.4rem 0.5rem;
    gap: 0.1rem;
    margin-left: 12px;
  }
`;

const Count = styled.span`
  font-size: 0.8rem;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;
