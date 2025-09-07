import { useNavigate } from "react-router-dom";
import { CONFIG } from "@/shared/config";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";
import styles from "./styles.module.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const imgSrc = product.image?.startsWith("http")
    ? product.image
    : `${CONFIG.API_URL}/${product.image}`;

  return (
    <li>
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
              ${product.discount ? product.discont_price : product.price}
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
};

export default ProductCard;
