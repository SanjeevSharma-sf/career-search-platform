import styled, { createGlobalStyle } from "styled-components";
import img from "./assets/background.jpg";
export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif; 
    font-style: normal;
  }
  body {
    background: #efefef;
  //   @media (max-width:419px){
  //     background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(${img});
  //     background-size: cover;
      
  // }
  }
`;

export const AppContainer = styled.div`
  max-width: 1600px;
  margin: auto;
  background: #fff;
  main {
    position: relative;
  }
  @media (max-width: 419px) {
    background: unset;
    .mobilecontainer {
      background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),
        url(${img});
      background-size: cover;
      --bs-gutter-x: 0rem;
    }
  }
`;
export const MobileView = styled.div`
  @media (max-width: 419px) {
    display: none;
  }
`;
export const InterStateWrapper = styled.div.attrs({
  className: "interstate-wrapper",
})`
  @media (max-width: 991px) {
    .container {
      max-width: 100%;
      // padding:0px 30px;
    }
  }
`;
