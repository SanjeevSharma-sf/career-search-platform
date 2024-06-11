import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Copyright = styled.div`
  padding: 20px 0 1px;
  text-align: center;
  a {
    color: #ffc107;
  }
  @media (max-width: 700px) {
    padding: 0 2rem;
    p {
      font-size: 10px;
    }
  }
  @media (max-width: 991px) {
    padding: 20px 10px 5px;
  }
  @media (max-width: 419px) {
    display: none;
  }
`;

const Footer = () => {
  return (
    <Copyright>
      <p>
        Copyright &copy; {new Date().getFullYear()} Job Seeker Association. All
        rights reserved. &nbsp;
        <Link to="/terms-and-conditions">Terms of Use</Link>{" "}
        <span style={{ color: "#ffd100" }}>|</span>{" "}
        {/* <Link to="/privacy-policy">Privacy Policy </Link> */}
      </p>
    </Copyright>
  );
};

export default Footer;
