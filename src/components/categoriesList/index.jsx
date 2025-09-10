import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/categorySlice";
import CategoryCard from "../../components/categoryCard";
import CategoryCardSkeleton from "../../components/categoryCard/skeleton";
import styles from "./styles.module.css";

const CategoriesList = ({ limit }) => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.categories);

  useEffect(() => {
    if (!items.length && status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, items.length, status]);

  const categories = limit ? items.slice(0, limit) : items;
  const isLoading = status === "loading";
  const skeletonCount = limit || 8;

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))
          : categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
      </ul>
    </section>
  );
};

export default CategoriesList;
