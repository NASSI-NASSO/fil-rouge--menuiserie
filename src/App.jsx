import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
   
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produits" element={<Produtts />} />
            <Route path="/Devis" element={<Devis />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin-secret" element={<ProductsAdmin />} />
              <Route path="/admin/productsAdmin" element={<Navigate to="/admin-secret" replace />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/AddProduct" element={<AddProducts />} />
              <Route path="/admin/editProduct/:id" element={<EditProduct />} />
            </Route>

            {/* Redirect old admin link to login if accessed directly */}
            <Route path="/admin" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
