import styles from "./styles.module.css";
import SectionHeading from "../sectionHeading";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/slices/productSlice";
import { CONFIG } from "@/shared/config";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";

const SaleSection = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const discountedProducts = items
    .filter((p) => p.discont_price && p.discont_price < p.price)
    .map((p) => ({
      ...p,
      discount: Math.round(((p.price - p.discont_price) / p.price) * 100),
    }))
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);

  return (
    <section className={styles.section}>
      <SectionHeading title="Sale" to="/sales" buttonText="All sales" />
      <ul className={styles.list}>
        {discountedProducts.map((product) => {
          const imgSrc = product.image?.startsWith("http")
            ? product.image
            : `${CONFIG.API_URL}/${product.image}`;
          return (
            <li key={product.id} className={styles.item}>
              <Card
                className={`${styles.card} ${styles.mui}`}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <Box className={styles.badge}>-{product.discount}%</Box>
                <Box className={styles.mediaWrapper}>
                  <CardMedia
                    component="img"
                    image={imgSrc}
                    alt={product.title}
                    className={styles.image}
                  />
                  <Button
                    variant="contained"
                    className={`${styles.addButton} ${styles.mui}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Add to cart
                  </Button>
                </Box>
                <CardContent className={`${styles.CardContent} ${styles.mui}`}>
                  <Typography
                    component="h3"
                    className={`${styles.name} ${styles.mui}`}
                  >
                    {product.title}
                  </Typography>
                  <div className={styles.prices}>
                    <Typography
                      component="span"
                      className={`${styles.newPrice} ${styles.mui}`}
                    >
                      ${product.discont_price}
                    </Typography>
                    <Typography
                      component="span"
                      className={`${styles.oldPrice} ${styles.mui}`}
                    >
                      ${product.price}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SaleSection;
