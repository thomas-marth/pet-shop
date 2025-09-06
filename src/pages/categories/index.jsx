import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "@/shared/http";
import styles from "./styles.module.css";

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

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
    </div>
  );
}

export default CategoriesPage;
