import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { CONFIG } from "@/shared/config";
import styles from "./styles.module.css";

const CategoriesSection = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.categories);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, items.length]);

  const categories = items.slice(0, 4);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.top}>
          <h2 className={styles.title}>Categories</h2>
          <div className={styles.buttonWrapper}>
            <Button
              component={NavLink}
              to="/categories"
              variant="outlined"
              sx={{
                color: "#8B8B8B",
                borderColor: "#DDD",
                fontFamily: "Montserrat",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: 1.3,
                textTransform: "none",
                borderRadius: "6px",
                "&:hover": {
                  borderColor: "#DDD",
                  backgroundColor: "rgba(0,0,0,0.04)",
                },
              }}
            >
              All categories
            </Button>
            <div className={styles.divider} />
          </div>
        </div>
        <ul className={styles.list}>
          {categories.map((cat) => {
            const imgSrc = cat.image?.startsWith("http")
              ? cat.image
              : `${CONFIG.API_URL}/${cat.image}`;
            return (
              <li key={cat.id} className={styles.item}>
                <NavLink to={`/categories/${cat.id}`}>
                  <img src={imgSrc} alt={cat.title} className={styles.image} />
                  <p className={styles.name}>{cat.title}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default CategoriesSection;
