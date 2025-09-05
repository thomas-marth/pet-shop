import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Pages
import HomePage from "./pages/home";
import CategoriesPage from "./pages/categories";
import ProductsPage from "./pages/products";
import SalesPage from "./pages/sales";
import CartPage from "./pages/cart";
import NotFoundPage from "./pages/notFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* header layout */}
        <Route index element={<HomePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:id" element={<CategoriesPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductsPage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="cart" element={<CartPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
