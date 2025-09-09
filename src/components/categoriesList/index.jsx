import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/categorySlice";
import CategoryCard from "../../components/categoryCard";
import styles from "./styles.module.css";

const CategoriesList = ({ limit }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.categories);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, items.length]);

  const categories = limit ? items.slice(0, limit) : items;

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </ul>
    </section>
  );
};

export default CategoriesList;
