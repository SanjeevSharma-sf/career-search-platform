import { Route, Routes } from "react-router-dom";
import { useRef, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles, AppContainer } from "./GlobalStyles";
const Loader = lazy(() => import("./components/Loader"));
const DefaultLayout = lazy(() =>
  import("./containers/Layout/DefaultLayout/DefaultLayout")
);

function App() {
  const appRef = useRef(null);
  return (
    <AppContainer ref={appRef}>
      <ToastContainer />
      <GlobalStyles />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<DefaultLayout appRef={appRef} />} />
        </Routes>
      </Suspense>
    </AppContainer>
  );
}

export default App;
