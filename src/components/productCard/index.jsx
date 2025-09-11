import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import { addToCart } from "@/redux/slices/cartSlice";
import { derivePricing, resolveImageUrl } from "@/shared/utils/product";
import { formatPrice } from "@/shared/utils/money";
import styles from "./styles.module.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgLoaded, setImgLoaded] = useState(false);

  const { hasDiscount, effectivePrice, oldPrice, discountPercent } =
    derivePricing(product);
  const imgSrc = resolveImageUrl(product.image);

  const handleAdd = (event) => {
    event.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
  };

  console.debug("[Card pricing]", {
    id: product.id,
    price: product.price,
    discont_price: product.discont_price,
    derived: { hasDiscount, effectivePrice, oldPrice, discountPercent },
  });

  const handleOpen = () => navigate(`/products/${product.id}`);

  return (
    <li>
      <Card className={`${styles.card} ${styles.mui}`} onClick={handleOpen}>
        {discountPercent != null && (
          <Box className={styles.badge}>-{discountPercent}%</Box>
        )}

        <Box className={`${styles.mediaWrapper} ${styles.mui}`}>
          {!imgLoaded && (
            <Skeleton variant="rectangular" width="100%" height={284} />
          )}
          <CardMedia
            component="img"
            image={imgSrc}
            alt={product.title}
            className={styles.image}
            onLoad={() => setImgLoaded(true)}
            sx={{ display: imgLoaded ? "block" : "none" }}
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
              {formatPrice(effectivePrice)}
            </Typography>

            {discountPercent != null && (
              <Typography
                component="span"
                className={`${styles.oldPrice} ${styles.mui}`}
              >
                {formatPrice(oldPrice)}
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
    </li>
  );
};

export default ProductCard;
