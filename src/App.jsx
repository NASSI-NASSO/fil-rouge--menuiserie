import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Composent/NavBar";
import Footer from "./Composent/Footer";
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
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
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
