import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";

const Individual_header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <div className="holder">
          <h1>Eventiq</h1>
          <p>Your event starts here</p>
        </div>

        <SearchContainer>
          <SearchIconHolder>
            <Search size={18} color="#717182" />
          </SearchIconHolder>
          <SearchInput type="text" placeholder="Search" />
        </SearchContainer>

        <UserSection>
          <div className="avatar" onClick={toggleDropdown}>
            P
          </div>
          <UserName>Princess</UserName>

          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="user-info">
                <h4>Princess Umez</h4>
                <p>princessumez@gmail.com</p>
              </div>

              <div className="menu">
                <div className="menu-item">
                  <div className="indicator"></div>
                  <Link to="/individual-dashboard/MyProfile" className="link">
                    <span>View Profile</span>
                  </Link>
                </div>
                <div className="menu-item">
                  <span>Help Center</span>
                </div>
                <div className="menu-item logout">
                  <FiLogOut className="icon" />
                  <span>Log out</span>
                </div>
              </div>
            </div>
          )}
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Individual_header;

const HeaderContainer = styled.header`
  background-color: #ffffff;
  padding: 0.1rem 4rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 1024px) {
<<<<<<< HEAD
    padding: 0.5rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
=======
    padding: 1rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
>>>>>>> faadeeabbd4ee54e5eb2d3520c6d0865fccd8036
  }
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 95px;

  @media (max-width: 768px) {
    height: 70px;
  }

  @media (max-width: 480px) {
    height: 60px;
  }

  .holder {
    width: 25%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    @media (max-width: 1024px) {
      width: 25%;
    }

    @media (max-width: 768px) {
      width: auto;
      height: auto;
    }

    h1 {
      margin: 0;
      font-weight: lighter;
      color: #603379;
      font-size: 2.2rem;
      font-family: "Yesteryear", cursive;

      @media (max-width: 768px) {
        font-size: 1.8rem;
      }

      @media (max-width: 480px) {
        font-size: 1.5rem;
      }
    }

    p {
      margin: 0;
      font-size: 0.9rem;
<<<<<<< HEAD
      color: #444;
    }
  }

  @media (max-width: 1024px) {
    .holder {
      h1 {
        font-size: 1.8rem;
      }
      p {
        font-size: 0.85rem;
      }
      small {
        font-size: 0.75rem;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    align-items: flex-start;
    gap: 1rem;

    .holder {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      text-align: left;

      h1 {
        font-size: 1.8rem;
      }

      p {
        font-size: 0.85rem;
      }

      small {
        font-size: 0.75rem;
      }
    }

    div:last-child {
      position: absolute;
      right: 1.5rem;
      top: 1rem;
    }
  }

  @media (max-width: 480px) {
    gap: 0.8rem;

    .holder {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      h1 {
        font-size: 1.5rem;
      }

      p {
        font-size: 0.8rem;
      }

      small {
        font-size: 0.7rem;
      }
    }

    div:last-child {
      top: 0.8rem;
      right: 1rem;
=======

      @media (max-width: 768px) {
        font-size: 0.75rem;
      }

      @media (max-width: 480px) {
        display: none;
      }
>>>>>>> faadeeabbd4ee54e5eb2d3520c6d0865fccd8036
    }
  }
`;

const SearchContainer = styled.div`
  width: 550px;
  margin: 0 2rem;
  display: flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  background-color: #ececf080;
  border-radius: 0.5rem;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 400px;
<<<<<<< HEAD
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin: 0;
    border-radius: 8px;
=======
    margin: 0 1.5rem;
  }

  @media (max-width: 768px) {
    width: 300px;
    margin: 0 1rem;
  }

  @media (max-width: 480px) {
    width: auto;
    flex: 1;
    margin: 0 0.75rem;
>>>>>>> faadeeabbd4ee54e5eb2d3520c6d0865fccd8036
  }
`;

const SearchIconHolder = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ececf080;

  @media (max-width: 480px) {
    width: 35px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 0.5rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  outline: none;
  border: none;
  background: transparent;

<<<<<<< HEAD
  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.6rem 0.4rem;
=======
  @media (max-width: 768px) {
    padding: 0.6rem 0.5rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.4rem;
    font-size: 0.8rem;
>>>>>>> faadeeabbd4ee54e5eb2d3520c6d0865fccd8036
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    gap: 0.4rem;
  }

  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6b46c1, #9333ea);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    cursor: pointer;
    border: 2px solid #e0aa3d;

    @media (max-width: 768px) {
      width: 32px;
      height: 32px;
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      width: 28px;
      height: 28px;
      font-size: 0.85rem;
    }
  }

  .profile-dropdown {
    position: absolute;
    top: 60px;
    right: 0;
    width: 220px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    padding: 12px 0;
    color: #333;
    z-index: 100;
    cursor: pointer;

    @media (max-width: 768px) {
      top: 50px;
      width: 200px;
    }

    @media (max-width: 480px) {
      top: 45px;
      width: 180px;
      right: -10px;
    }

    .user-info {
      padding: 0 16px 10px;
      border-bottom: 1px solid #eee;

      @media (max-width: 480px) {
        padding: 0 12px 8px;
      }

      h4 {
        font-size: 1.1rem;
        font-weight: 600;
        color: #000;
        margin-bottom: 4px;

        @media (max-width: 480px) {
          font-size: 1rem;
        }
      }

      p {
        font-size: 0.9rem;
        color: #777;
        margin: 0;

        @media (max-width: 480px) {
          font-size: 0.8rem;
        }
      }
    }

    .menu {
      display: flex;
      flex-direction: column;
      margin-top: 5px;

      .menu-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        cursor: pointer;
        transition: background 0.2s ease;

        @media (max-width: 480px) {
          padding: 8px 12px;
          gap: 6px;
        }

        .link {
          text-decoration: none;
          color: inherit;
          font-size: 0.9rem;

          @media (max-width: 480px) {
            font-size: 0.85rem;
          }
        }

        &:hover {
          background: #f8f8f8;
        }

        .indicator {
          width: 4px;
          height: 16px;
          background: #5d3fd3;
          border-radius: 4px;

          @media (max-width: 480px) {
            height: 14px;
          }
        }

        span {
          font-size: 0.9rem;

          @media (max-width: 480px) {
            font-size: 0.85rem;
          }
        }
      }

      .logout {
        color: red;
        border-top: 1px solid #eee;
        margin-top: 5px;
        padding-top: 10px;

        @media (max-width: 480px) {
          padding-top: 8px;
        }

        .icon {
          font-size: 1rem;

          @media (max-width: 480px) {
            font-size: 0.9rem;
          }
        }

        &:hover {
          background: #ffecec;
        }
      }
    }
  }

  @media (max-width: 768px) {
    align-self: flex-end;
    gap: 0.5rem;

    .avatar {
      width: 32px;
      height: 32px;
      font-size: 0.9rem;
    }

    .profile-dropdown {
      top: 50px;
      width: 200px;
    }
  }

  @media (max-width: 480px) {
    gap: 0.4rem;

    .avatar {
      width: 30px;
      height: 30px;
      font-size: 0.8rem;
    }

    .profile-dropdown {
      top: 45px;
      width: 180px;

      .user-info h4 {
        font-size: 1rem;
      }

      .user-info p {
        font-size: 0.8rem;
      }

      .menu-item span {
        font-size: 0.8rem;
      }
    }
  }
`;

const UserName = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #0a0a0a;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
<<<<<<< HEAD
    font-size: 1rem;
=======
    font-size: 14px;
>>>>>>> faadeeabbd4ee54e5eb2d3520c6d0865fccd8036
  }
`;
