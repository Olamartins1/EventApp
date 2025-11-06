import React from "react";
import styled from "styled-components";

const AdminHeader = () => {
  return (
    <Container>
      <Wrapper>
        <div className="AdminIcon">
          <div className="Text">
            <div className="Name">Admin User</div>
            <div className="Email">admin@eventiq.ng</div>
          </div>
          <div className="Avatar">AD</div>
        </div>
      </Wrapper>
    </Container>
  );
};

export default AdminHeader;

const Container = styled.div`
  width: 100%;
  height: auto;
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: white;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #f3f4f6;

  .AdminIcon {
    width: 40%;
    height: 80px;
    margin-right: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }

  .Text {
    width: 50%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .Name {
    width: 100px;
    height: 30px;
  }

  .Email {
    width: 150px;
    height: 30px;
    font-size: 16px;
    color: gray;
    font-weight: 200;
  }

  .Avatar {
    width: 40px;
    height: 40px;
    background: #603379;
    border-radius: 50px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 300;
  }

  @media (max-width: 1024px) {
    .AdminIcon {
      width: 50%;
      margin-right: 20px;
    }
    .Email {
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    height: 80px;

    .AdminIcon {
      width: 60%;
      gap: 8px;
    }

    .Name {
      font-size: 14px;
      width: auto;
    }

    .Email {
      font-size: 12px;
      width: auto;
    }

    .Avatar {
      width: 35px;
      height: 35px;
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    justify-content: center;

    .AdminIcon {
      width: 90%;
      margin-right: 0;
      justify-content: space-between;
    }

    .Text {
      align-items: flex-start;
    }

    .Name {
      font-size: 13px;
    }

    .Email {
      font-size: 11px;
    }

    .Avatar {
      width: 30px;
      height: 30px;
      font-size: 14px;
    }
  }
`;
