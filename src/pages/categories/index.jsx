import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbsNav from "@/components/breadcrumbs";
import CategoriesSection from "@/components/categoriesSection";
import { http } from "@/shared/http";

function CategoriesPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const { data } = await http.get(`/categories/${id}`);
          setCategory(data.category);
          console.log("Data ", data.category);
        } catch {
          setCategory(null);
        }
      };
      fetchCategory();
    }
  }, [id]);

  const title = id ? category?.title || "Loading..." : "Categories";
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
      {id ? <h1>{title}</h1> : <CategoriesSection />}
    </div>
  );
}

export default CategoriesPage;
