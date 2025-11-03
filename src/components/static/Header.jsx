import React from "react";
import styled from "styled-components";
import { FiBell } from "react-icons/fi";

const Header = () => {
  return (
    <Holder>
      <Wrapper>
        <div className="Icon">
          <FiBell />
          <div className="box">0</div>
        </div>
        <div className="Image">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            alt="Profile"
          />
        </div>
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
  border-bottom: 1px solid #e5e7eb;
  z-index: 100;

  @media (max-width: 768px) {
    height: 70px;
  }

  @media (max-width: 480px) {
    height: 60px;
  }
`;

const Wrapper = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;

  @media (max-width: 768px) {
    width: 90%;
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }

  .Icon {
    width: 40px;
    height: 40px;
    border-radius: 20%;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid #ccc;
    position: relative;
    transition: all 0.2s ease;

    &:hover {
      background: #f9fafb;
    }

    &:active {
      transform: scale(0.95);
    }

    @media (max-width: 768px) {
      width: 38px;
      height: 38px;
      font-size: 19px;
    }

    @media (max-width: 480px) {
      width: 36px;
      height: 36px;
      font-size: 18px;
    }
  }

  .Image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;

    &:hover {
      border-color: #6366f1;
    }

    @media (max-width: 768px) {
      width: 38px;
      height: 38px;
    }

    @media (max-width: 480px) {
      width: 36px;
      height: 36px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .box {
    width: 15px;
    height: 15px;
    background: red;
    color: white;
    display: flex;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    position: absolute;
    top: -3px;
    right: -3px;

    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
      font-size: 9px;
      top: -2px;
      right: -2px;
    }

    @media (max-width: 480px) {
      width: 13px;
      height: 13px;
      font-size: 8px;
    }
  }
`;
