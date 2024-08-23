import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import AdminLogin from "./login";
import Dashboard from "./Dashboard";
import Details from "./Details";
import NotFound from "./NotFound";
import Form from "./Form";
import ExcelEditor from "./ExcelEditor";

const PublicRoutes = () => {
  let auth = localStorage.getItem("isLoggin");
  return auth ? <Navigate to="/" /> : <Outlet />;
};

const PrivateRoutes = () => {
  let auth = localStorage.getItem("isLoggin");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<AdminLogin />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/details" element={<Details />} />
          <Route path="/form" element={<Form />} />
          <Route path="/excel-editor" element={<ExcelEditor />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
