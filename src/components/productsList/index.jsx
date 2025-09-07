import styles from "./styles.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/slices/productSlice";
import ProductCard from "../../components/productCard";

const ProductsList = ({
  limit,
  sortByDiscount = false,
  discount = false,
  categoryId,
}) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  let products = items
    .filter((p) => (categoryId ? p.categoryId === Number(categoryId) : true))
    .map((p) => {
      const hasDiscount = p.discont_price && p.discont_price < p.price;
      return {
        ...p,
        discount: hasDiscount
          ? Math.round(((p.price - p.discont_price) / p.price) * 100)
          : null,
      };
    });

  if (discount) {
    products = products.filter((p) => p.discount !== null);
  }

  products = products.sort((a, b) =>
    sortByDiscount ? (b.discount || 0) - (a.discount || 0) : a.id - b.id
  );

  if (limit) {
    products = products.slice(0, limit);
  }

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
};

export default ProductsList;
