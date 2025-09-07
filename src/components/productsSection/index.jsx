import styles from "./styles.module.css";
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

const ProductsSection = ({
  limit,
  sortByDiscount = false,
  discount = false,
  categoryId,
}) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const navigate = useNavigate();

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
      <ul className={`${styles.list} ${styles.mui}`}>
        {products.map((product) => {
          const imgSrc = product.image?.startsWith("http")
            ? product.image
            : `${CONFIG.API_URL}/${product.image}`;
          return (
            <li key={product.id}>
              <Card
                className={`${styles.card} ${styles.mui}`}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {product.discount && (
                  <Box className={styles.badge}>-{product.discount}%</Box>
                )}
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
                      $
                      {product.discount ? product.discont_price : product.price}
                    </Typography>
                    {product.discount && (
                      <Typography
                        component="span"
                        className={`${styles.oldPrice} ${styles.mui}`}
                      >
                        ${product.price}
                      </Typography>
                    )}
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

export default ProductsSection;
