import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Navbar from "./components/Navbar";
import CatalogPage from "./pages/CatalogPage";
import BasketPage from "./pages/BasketPage";
import NotFoundPage from "./pages/NotFoundPage";
import DiscountRulesAdmin from "./pages/DiscountRulesAdmin";

function App() {
  return (
    <Router>
      <Navbar />
      <Container
        maxWidth="xl"
        className="bg-white min-h-screen py-8 px-2 sm:px-8"
      >
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/products" element={<CatalogPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route
            path="/admin/discount-rules"
            element={<DiscountRulesAdmin />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </Router>
  );
}
export default App;
