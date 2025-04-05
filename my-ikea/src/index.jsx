import { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Category from "./Components/Category.jsx";
import Products from "./Components/Products.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";
import UserProvider from "./Components/UserContext.jsx";

const routing = (
  <UserProvider>
    <Router>
      <h3 style={{ textAlign: "center", position: "sticky" }}>
        Get up to 20% off on storage solutions. Shop now.
      </h3>
      <hr />
      <div style={{ textAlign: "right" }}>
        <Link to="/">Home</Link> |<Link to="/Category">Category</Link> |
        <Link to="/Products">Products</Link> |<Link to="/Contact">Contact</Link>{" "}
        |<Link to="/About">About</Link>
      </div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Details/:id" element={<ProductDetails />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Router>
  </UserProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StrictMode>{routing}</StrictMode>);
