import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import RentalDashboard from "./Pages/RentalDashboard";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/rentalDashboard" element={<ProtectedRoute />}>
          <Route path="/rentalDashboard" element={<RentalDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
