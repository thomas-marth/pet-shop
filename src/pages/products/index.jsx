import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "@/shared/http";
import styles from "./styles.module.css";
import BreadcrumbsNav from "../../ui/breadcrumbs";
import ProductsList from "../../components/productsList";
import Product from "../../components/product";

function ProductsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);

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

  useEffect(() => {
    if (product?.categoryId) {
      const fetchCategory = async () => {
        try {
          const { data } = await http.get(`/categories/${product.categoryId}`);
          setCategory(data.category);
        } catch {
          setCategory(null);
        }
      };
      fetchCategory();
    }
  }, [product?.categoryId]);

  const title = id ? product?.title || "Loading..." : "All products";
  const categoryTitle = id ? category?.title || "Loading..." : null;
  const items = id
    ? [
        { path: "/", label: "Main Page" },
        { path: "/categories", label: "Categories" },
        {
          path: category ? `/categories/${product.categoryId}` : null,
          label: categoryTitle,
        },
        { label: title },
      ]
    : [{ path: "/", label: "Main Page" }, { label: title }];

  return (
    <div className={styles.container}>
      <BreadcrumbsNav items={items} />
      {id ? (
        product ? <Product product={product} /> : <p>Loading...</p>
      ) : (
        <>
          <h1>{title}</h1>
          <ProductsList />
        </>
      )}
    </div>
  );
}

export default ProductsPage;
