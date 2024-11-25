import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import RentalDashboard from "./Pages/RentalDashboard";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import NotFound from "./Pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/rentalDashboard" element={<RentalDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
