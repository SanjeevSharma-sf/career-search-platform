import React from "react";
import { useRef, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import JobList from "../../../pages/JobList/JobList";
const Signup = lazy(() => import("../../../pages/Signup"));
const Login = lazy(() => import("../../../pages/Login/Login"));

const Main = (props) => {
  //   if (props.appRef.current !== null) {
  //     props.appRef.current.style.maxWidth = '1600px';
  //   }
  return (
    <Routes>
      <Route path="/" element={<JobList />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
};

export default Main;
