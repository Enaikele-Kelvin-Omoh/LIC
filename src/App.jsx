import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { pageLinks } from "./site/pageLinks";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import LecturePage from "./pages/LecturePage/LecturePage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import NotepadPage from "./pages/NotepadPage/NotepadPage";
import { AuthProvider } from "./context/AuthContext";
import { Flip, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path={pageLinks.unresolvedPage.dynamicUrl}
              element={<DashboardPage />}
            />
            <Route
              path={pageLinks.authPage.dynamicUrl}
              element={<AuthenticationPage />}
            />
            <Route
              path={pageLinks.lecturePage.dynamicUrl}
              element={<LecturePage />}
            />
            <Route
              path={pageLinks.dashboardPage.dynamicUrl}
              element={<DashboardPage />}
            />
            <Route
              path={pageLinks.notepadPage.dynamicUrl}
              element={<NotepadPage />}
            />
          </Routes>
          <Modal />
          <ToastContainer
            position={window.innerWidth > 800 ? "bottom-left" : "top-center"}
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={window.innerWidth > 800 ? Flip : Bounce}
          />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
