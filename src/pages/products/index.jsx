import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbsNav from "@/components/breadcrumbs";
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
        } catch {
          setProduct(null);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const title = id ? product?.title || "Loading..." : "All products";
  const items = id
    ? [
        { path: "/", label: "Main Page" },
        { path: "/products", label: "All products" },
        { label: title },
      ]
    : [{ path: "/", label: "Main Page" }, { label: title }];

  return (
    <div className={styles.container}>
      <BreadcrumbsNav items={items} />
      <h1>{title}</h1>
    </div>
  );
}

export default ProductsPage;
