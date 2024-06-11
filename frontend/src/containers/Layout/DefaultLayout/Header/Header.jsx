import React, { Suspense, lazy } from "react";
import styled from "styled-components";
const Navbar = lazy(() => import("../../../../components/Navbar"));
const Loader = lazy(() => import("../../../../components/Loader"));

const StyledHeader = styled.div`
  @media (max-width: 991px) {
    display: block;
    margin: 0;
    padding: 0;
  }
  @media (max-width: 419px) {
    display: none;
    margin: 0;
    padding: 0;
  }
`;

const Header = () => (
  <StyledHeader>
    <Suspense fallback={<Loader />}>
      <Navbar />
    </Suspense>
  </StyledHeader>
);

export default Header;
