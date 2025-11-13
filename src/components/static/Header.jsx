import React from "react";
import styled from "styled-components";
import { FiBell } from "react-icons/fi";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
import { useContext, useState, useEffect } from "react";

const Header = () => {
  const { user } = useContext(AuthContext);
  const id = JSON.parse(localStorage.getItem("userid"));
  console.log("id", id);
  const [data, setData] = useState(null);

  const getUser = async () => {
    try {
      const res = await axios.get(
        `https://eventiq-final-project.onrender.com/api/v1/client/${id}`
      );
      console.log("the res", res);
      setData(res?.data?.data);
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
        <div className="Icon">
          <FiBell />
          <div className="box">0</div>
        </div>

        <div className="avatar">{data?.firstName?.charAt(0).toUpperCase()}</div>
        <UserName>{data?.firstName}</UserName>
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
    background: linear-gradient(135deg, #6b46c1, #9333ea);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
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

const UserName = styled.h3`
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
