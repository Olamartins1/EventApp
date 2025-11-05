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

    @media (max-width: 1200px) {
      width: 40px;
      height: 40px;
      font-size: 19px;
    }

    @media (max-width: 1024px) {
      width: 38px;
      height: 38px;
      font-size: 18px;
      border-radius: 10px;
    }

    @media (max-width: 768px) {
      width: 36px;
      height: 36px;
      font-size: 17px;
      border-radius: 8px;
    }

    @media (max-width: 480px) {
      width: 34px;
      height: 34px;
      font-size: 16px;
    }

    @media (max-width: 360px) {
      width: 32px;
      height: 32px;
      font-size: 15px;
    }
  }

  .Image {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.25s ease;
    border: 2px solid transparent;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    /* Allow the image to shrink on very small screens and prevent it
       from being clipped by parent containers. Disable hover scaling on
       touch devices to avoid layout shift. */
    flex: 0 0 auto;
    min-width: 0;

    &:hover {
      border-color: #6366f1;
      transform: scale(1.05);
    }

    @media (max-width: 1200px) {
      width: 40px;
      height: 40px;
    }

    @media (max-width: 1024px) {
      width: 38px;
      height: 38px;
    }

    @media (max-width: 768px) {
      width: 36px;
      height: 36px;
    }

    @media (max-width: 480px) {
      width: 38px; /* slightly larger for tap targets */
      height: 38px;
      transform: none; /* avoid scaling on touch */
    }

    @media (max-width: 360px) {
      width: 32px;
      height: 32px;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      transition: transform 0.25s ease;

      /* only allow hover transform on non-touch (larger) screens */
      @media (min-width: 481px) {
        &:hover {
          transform: scale(1.05);
        }
      }
    }
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
