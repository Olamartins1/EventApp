import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AiOutlineTable } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../../../assets/AuthContext/AuthContext";

const MyProfile = () => {
  const [show, setShow] = useState("bookings");
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/individual-dashboard/MyProfile/bookings");
  }, [navigate]);

  return (
    <Holder>
      <div className="header">
        <article>
          <div className="Logo">
            <h1>Eventiq</h1>
            <p>Your events start here</p>
          </div>
          <div className="myProfile"></div>
        </article>
      </div>

      <div className="sub">
        <article>
          <Link to="/individual-dashboard" className="classlink">
            <h2>
              <IoIosArrowRoundBack className="micon" /> Back to Home
            </h2>
          </Link>

          <div className="prince">
            <div className="bob">
              <p>{user?.firstName[0]}</p>
            </div>
            <div className="bobby">
              <h3>{user?.firstName}</h3>
              <p>{user?.email}</p>
            </div>
          </div>
        </article>
      </div>

      <div className="dier">
        <div className="tabs">
          <div
            className={show === "bookings" ? "tab active" : "tab"}
            onClick={() => {
              setShow("bookings");
              navigate("/individual-dashboard/MyProfile/bookings");
            }}
          >
            <AiOutlineTable className="icon" />
            <span>Bookings</span>
          </div>

          <div
            className={show === "notifications" ? "tab active" : "tab"}
            onClick={() => {
              setShow("notifications");
              navigate("/individual-dashboard/MyProfile/notifications");
            }}
          >
            <IoNotificationsOutline className="icon" />
            <span>Notifications</span>
          </div>

          <div
            className={show === "settings" ? "tab active" : "tab"}
            onClick={() => {
              setShow("settings");
              navigate("/individual-dashboard/MyProfile/settings");
            }}
          >
            <FiSettings className="icon" />
            <span>Settings</span>
          </div>
        </div>
      </div>

      <Outlet />
    </Holder>
  );
};

export default MyProfile;

const Holder = styled.div`
  width: 100%;
  height: 110vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: "Arial", sans-serif;

  .header {
    width: 100%;
    height: 13%;
    border-bottom: 3px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;

    article {
      width: 90%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .Logo {
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        h1 {
          font-family: "Arial", sans-serif;
          color: #5d3fd3;
        }
      }

      .myProfile {
        width: 20%;
      }
    }
  }

  .sub {
    width: 100%;
    height: 24%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid gray;

    article {
      width: 90%;
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;

      .classlink {
        text-decoration: none;
        color: inherit;
      }

      h2 {
        font-size: 1rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        .micon {
          font-size: 2rem;
        }
      }

      .prince {
        width: 40%;
        height: 70%;
        display: flex;
        gap: 0.7rem;

        .bob {
          width: 17%;
          display: flex;
          align-items: center;

          p {
            width: 95%;
            height: 70%;
            border-radius: 60%;
            background: purple;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            color: white;
          }
        }

        .bobby {
          display: flex;
          flex-direction: column;
          justify-content: center;

          h3 {
            font-size: 2rem;
            margin: 0;
          }
          p {
            color: gray;
            font-size: 1rem;
          }
        }
      }
    }
  }

  .dier {
    width: 90%;

    .tabs {
      margin-top: 1rem;
      background: #f4f4f7;
      border-radius: 50px;
      padding: 5px;
      display: flex;
      gap: 10px;
      width: fit-content;

      .tab {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 20px;
        border-radius: 30px;
        cursor: pointer;
        transition: background 0.2s ease;
        color: #333;

        .icon {
          font-size: 1.1rem;
        }

        &:hover {
          background: #e7e7eb;
        }
      }

      .active {
        background: white;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
        font-weight: 600;
      }
    }
  }
`;
