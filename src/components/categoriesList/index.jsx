import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { CONFIG } from "@/shared/config";
import styles from "./styles.module.css";

const CategoriesSection = ({ limit }) => {
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
      {/* <div className="container"> */}

      <ul className={styles.list}>
        {categories.map((cat) => {
          const imgSrc = cat.image?.startsWith("http")
            ? cat.image
            : `${CONFIG.API_URL}/${cat.image}`;
          return (
            <li key={cat.id} className={styles.item}>
              <NavLink to={`/categories/${cat.id}`} className={styles.link}>
                <div className={styles.imageWrapper}>
                  <img src={imgSrc} alt={cat.title} className={styles.image} />
                </div>
                <p className={styles.name}>{cat.title}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
      {/* </div> */}
    </section>
  );
};

export default CategoriesSection;
