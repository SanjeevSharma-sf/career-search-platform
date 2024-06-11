// import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const DefaultLayout = (props) => (
  <div>
    <Header {...props} />
    <Main {...props} />
    <Footer {...props} />
  </div>
);

export default DefaultLayout;
