import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Composent/NavBar";
import "./App.css"
import Home from "./pages/Home";
import Produtts from "./pages/produits";
import Devis from "./pages/Devis";
//admin
import Login from "./pages/login";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import Orders from "./pages/admin/Orders";
import AddProducts from "./pages/admin/AddProducts";
import EditProduct from "./pages/admin/EditProduct"

function App() {
   
  return (
    <BrowserRouter>
      <Navbar  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producttts" element={<Produtts />} />
        <Route path="/Devis" element={<Devis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/productsAdmin" element={<ProductsAdmin />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/AddProduct" element={<AddProducts />} />
        <Route path="/admin/editProduct/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
