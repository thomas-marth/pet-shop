import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesList from "../../components/categoriesList";
import ProductsList from "../../components/productsList";
import BreadcrumbsNav from "../../ui/breadcrumbs";
import ProductFilter from "../../ui/productFilter";
import styles from "./styles.module.css";
import { http } from "@/shared/http";

function CategoriesPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    discountOnly: false,
    sortBy: "default",
  });

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
      <h1 className={styles.title}>{title}</h1>
      {id ? (
        loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ProductFilter filters={filters} onChange={setFilters} />
            <ProductsList categoryId={Number(id)} filters={filters} />
          </>
        )
      ) : (
        <CategoriesList />
      )}
    </div>
  );
}

export default CategoriesPage;
