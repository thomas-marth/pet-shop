import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";

import SectionHeader from "../sectionHeader";
import { fetchProducts } from "@/redux/slices/productSlice";
import { CONFIG } from "@/shared/config";
import styles from "./styles.module.css";

const SaleSection = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

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
      <div className="container">
        <SectionHeader title="Sale" to="/sales" buttonText="All sales" />
        <ul className={styles.list}>
          {discountedProducts.map((product) => {
            const imgSrc = product.image?.startsWith("http")
              ? product.image
              : `${CONFIG.API_URL}/${product.image}`;
            return (
              <li key={product.id} className={styles.item}>
                <Card className={`${styles.card} ${styles.mui}`}>
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
                    >
                      Add to cart
                    </Button>
                  </Box>
                  <CardContent
                    className={`${styles.CardContent} ${styles.mui}`}
                  >
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
      </div>
    </section>
  );
};

export default SaleSection;
