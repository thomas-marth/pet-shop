import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CONFIG } from "@/shared/config";
import { addToCart } from "@/redux/slices/cartSlice";
import styles from "./styles.module.css";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imgSrc = product.image?.startsWith("http")
    ? product.image
    : `${CONFIG.API_URL}/${product.image}`;

  const handleAdd = (event) => {
    event.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <li>
      <Card
        className={`${styles.card} ${styles.mui}`}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        {product.discount && (
          <Box className={styles.badge}>-{product.discount}%</Box>
        )}
        <Box className={`${styles.mediaWrapper} ${styles.mui}`}>
          <CardMedia
            component="img"
            image={imgSrc}
            alt={product.title}
            className={styles.image}
          />
          <Button
            variant="contained"
            className={`${styles.addButton} ${styles.mui}`}
            onClick={handleAdd}
          >
            Add to cart
          </Button>
        </Box>
        <CardContent className={`${styles.CardContent} ${styles.mui}`}>
          <Typography component="h3" className={`${styles.name} ${styles.mui}`}>
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
