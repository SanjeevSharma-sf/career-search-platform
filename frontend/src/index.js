import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Loader from "./components/Loader";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthGuard } from "./components/Guards/AuthGuard/AuthGuard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <AuthGuard>
          <App />
        </AuthGuard>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
