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
                <Card
                  className={styles.card}
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "none",
                  }}
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
                      className={styles.addButton}
                      sx={{
                        position: "absolute",
                        left: "16px",
                        right: "16px",
                        bottom: "16px",
                        backgroundColor: "#0d50ff",
                        color: "#fff",
                        textTransform: "none",
                        borderRadius: "6px",
                        opacity: "0",
                        transform: "translateY(100%)",
                        pointerEvents: "none",
                        transition:
                          "background-color 0.3s, opacity 0.3s, transform 0.3s",
                      }}
                    >
                      Add to cart
                    </Button>
                  </Box>
                  <CardContent
                    sx={{
                      padding: "20px 32px 32px 32px",
                      borderTop: "1px solid #ddd",
                    }}
                  >
                    <Typography
                      component="h3"
                      className={styles.name}
                      sx={{
                        color: "#282828",
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        fontWeight: "500",
                        lineHeight: "1.3",
                        marginBottom: "16px",
                      }}
                    >
                      {product.title}
                    </Typography>
                    <div className={styles.prices}>
                      <Typography
                        component="span"
                        className={styles.newPrice}
                        sx={{
                          color: "#282828",
                          fontFamily: "Montserrat",
                          fontSize: "40px",
                          fontWeight: "600",
                          lineHeight: "1.1",
                        }}
                      >
                        ${product.discont_price}
                      </Typography>
                      <Typography
                        component="span"
                        className={styles.oldPrice}
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "20px",
                          fontWeight: "500",
                          lineHeight: "1.3",
                        }}
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
