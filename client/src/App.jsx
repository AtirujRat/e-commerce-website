import "./App.css";

import { CartProvider } from "./Context/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import NoMatch from "./Components/NoMatch";
import Product from "./Components/Product";
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add-product" element={<AddProduct />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="*" element={<NoMatch />}></Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
