import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesSection from "../../components/categoriesSection";
import ProductsSection from "./../../components/productsSection";
import BreadcrumbsNav from "../../ui/breadcrumbs";
import { http } from "@/shared/http";

function CategoriesPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchCategory = async () => {
        try {
          const { data } = await http.get(`/categories/${id}`);
          setCategory(data.category);
        } catch {
          setCategory(null);
        } finally {
          setLoading(false);
        }
      };
      fetchCategory();
    }
  }, [id]);

  const title = id
    ? loading
      ? "Loading..."
      : category?.title || "Category"
    : "Categories";
  const items = id
    ? [
        { path: "/", label: "Main Page" },
        { path: "/categories", label: "Categories" },
        { label: title },
      ]
    : [{ path: "/", label: "Main Page" }, { label: title }];

  return (
    <div className="container">
      <BreadcrumbsNav items={items} />
      <h1>{title}</h1>
      {id ? (
        loading ? (
          <p>Loading...</p>
        ) : (
          <ProductsSection categoryId={Number(id)} />
        )
      ) : (
        <CategoriesSection />
      )}
    </div>
  );
}

export default CategoriesPage;
