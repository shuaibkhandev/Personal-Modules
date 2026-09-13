import "./App.css";
import { Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;