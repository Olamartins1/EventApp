import React from "react";
import { useNavigate } from "react-router-dom";

import { useState, useRef, useEffect } from "react";
import "./SignupDropdown.css";

const SignupDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setIsOpen(false); // close dropdown after clicking

    if (option === "individual") {
      navigate("/signup-individual");
    } else if (option === "hall-owner") {
      navigate("/signup-hallowner");
    }
  };
  return (
    <>
      <div className="dropdown-container">
        <button onClick={() => setIsOpen(!isOpen)} className="sign-up-btn">
          Sign Up
          <svg
            className={`chevron-icon ${isOpen ? "chevron-open" : ""}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* <polyline points="18 15 12 9 6 15"></polyline> */}
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="dropdown-menu">
            {/* As an Individual */}
            <button
              onClick={() => handleOptionClick("individual")}
              className="dropdown-item dropdown-item-border"
            >
              <svg
                className="dropdown-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="dropdown-text">As a Client</span>
            </button>

            {/* As a Hall Owner */}
            <button
              onClick={() => handleOptionClick("hall-owner")}
              className="dropdown-item"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66663 8H9.33329"
                  stroke="#E0AA3D"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.66663 5.33398H9.33329"
                  stroke="#E0AA3D"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.33329 13.9993V11.9993C9.33329 11.6457 9.19282 11.3066 8.94277 11.0565C8.69272 10.8065 8.35358 10.666 7.99996 10.666C7.64634 10.666 7.3072 10.8065 7.05715 11.0565C6.8071 11.3066 6.66663 11.6457 6.66663 11.9993V13.9993"
                  stroke="#E0AA3D"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.00004 6.66602H2.66671C2.31309 6.66602 1.97395 6.80649 1.7239 7.05654C1.47385 7.30659 1.33337 7.64573 1.33337 7.99935V12.666C1.33337 13.0196 1.47385 13.3588 1.7239 13.6088C1.97395 13.8589 2.31309 13.9993 2.66671 13.9993H13.3334C13.687 13.9993 14.0261 13.8589 14.2762 13.6088C14.5262 13.3588 14.6667 13.0196 14.6667 12.666V5.99935C14.6667 5.64573 14.5262 5.30659 14.2762 5.05654C14.0261 4.80649 13.687 4.66602 13.3334 4.66602H12"
                  stroke="#E0AA3D"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 14V3.33333C4 2.97971 4.14048 2.64057 4.39052 2.39052C4.64057 2.14048 4.97971 2 5.33333 2H10.6667C11.0203 2 11.3594 2.14048 11.6095 2.39052C11.8595 2.64057 12 2.97971 12 3.33333V14"
                  stroke="#E0AA3D"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="dropdown-text">As a Venue Owner</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SignupDropdown;
