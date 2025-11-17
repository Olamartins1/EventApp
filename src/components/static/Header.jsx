import React from "react";
import styled from "styled-components";
import { FiBell } from "react-icons/fi";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const { user } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const id = JSON.parse(localStorage.getItem("userid"));
  console.log("id", id);
  const [data, setData] = useState(null);
  console.log("this is token", token);

  const getUser = async () => {
    try {
      const res = await axios.get(
        `https://eventiq-final-project.onrender.com/api/v1/ownervenue`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API User Data ===> ", res.data);
      console.log("the res", res?.data);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [id]);

  return (
    <Holder>
      <Wrapper>
        {/* <div className="Icon">
          <FiBell />
          <div className="box">0</div>
        </div> */}
{/* 
        <UserSection>
          <div className="avatar">
            {(user.firstName.charAt(0) || "?").toUpperCase()}
          </div>

          <UserName>{user.firstName}</UserName>
        </UserSection> */}
      </Wrapper>
    </Holder>
  );
};

export default Header;

const Holder = styled.div`
  width: 100%;
  height: 80px;
  background: #fff;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);

  @media (max-width: 1200px) {
    height: 75px;
  }

  @media (max-width: 1024px) {
    height: 70px;
  }

  @media (max-width: 768px) {
    height: 65px;
  }

  @media (max-width: 480px) {
    height: 60px;
  }

  @media (max-width: 360px) {
    height: 55px;
  }
`;

const Wrapper = styled.div`
  width: 95%;
  max-width: 1400px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 0 1rem;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    width: 96%;
    gap: 14px;
  }

  @media (max-width: 1024px) {
    width: 97%;
    padding: 0 0.75rem;
  }

  @media (max-width: 768px) {
    width: 98%;
    gap: 12px;
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    gap: 10px;
    padding: 0 0.5rem;
  }

  .Icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1.5px solid #e5e7eb;
    position: relative;
    transition: all 0.2s ease;
    background: transparent;

    &:hover {
      background: #f8f9fa;
      border-color: #d1d5db;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-weight: 600;
    cursor: pointer;
    gap: 1rem;
    border: 2px solid #e0aa3d;
  }

  .box {
    width: 18px;
    height: 18px;
    background: #ef4444;
    color: white;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    position: absolute;
    top: -5px;
    right: -5px;
    border: 2px solid #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;

    @media (max-width: 1200px) {
      width: 16px;
      height: 16px;
      font-size: 10px;
      top: -4px;
      right: -4px;
    }

    @media (max-width: 1024px) {
      width: 15px;
      height: 15px;
      font-size: 9px;
    }

    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
      font-size: 9px;
      top: -3px;
      right: -3px;
    }

    @media (max-width: 480px) {
      width: 13px;
      height: 13px;
      font-size: 8px;
      top: -2px;
      right: -2px;
    }

    @media (max-width: 360px) {
      width: 12px;
      height: 12px;
      font-size: 8px;
    }
  }
`;

const UserSection = styled.div`
  @media (max-width: 480px) {
    min-width: fit-content;
    padding: 0.25rem;
  }

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
    @media (max-width: 480px) {
      min-width: 28px;
      min-height: 28px;
    }

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
    @media (max-width: 480px) {
      transform: translateX(10%);
    }

    @media (max-width: 320px) {
      transform: translateX(15%);
    }

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
  @media (max-width: 480px) {
    font-size: 1rem;
  }

  font-size: 18px;
  font-weight: 500;
  color: #0a0a0a;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
