import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { pageLinks } from "./site/pageLinks";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import LecturePage from "./pages/LecturePage/LecturePage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import NotepadPage from "./pages/NotepadPage/NotepadPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path={pageLinks.authPage.dynamicUrl}
              element={<AuthenticationPage />}
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
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
