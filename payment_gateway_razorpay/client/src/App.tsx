import "./App.css";
import { Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import ProductsPage from "./pages/ProductsPage";
import PaymentSuccess from "./pages/PaymentSuccess";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
    </Routes>
  );
}

export default App;
