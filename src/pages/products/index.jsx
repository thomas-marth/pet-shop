import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "@/shared/http";
import styles from "./styles.module.css";

function ProductsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const { data } = await http.get(`/products/${id}`);
          setProduct(data[0]);
          console.log(data[0].title);
        } catch {
          setProduct(null);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const title = id ? product?.title || "Loading..." : "All products";

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
    </div>
  );
}

export default ProductsPage;
