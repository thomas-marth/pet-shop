import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { addToCart } from "@/redux/slices/cartSlice";
import QuantitySelector from "@/ui/quantitySelector";
import { derivePricing, resolveImageUrl } from "@/shared/utils/product";
import {
  useEnsureProductsLoaded,
  useRelatedProducts,
  useMagnifyOrigin,
  useProductDescriptionExpandable,
} from "@/features/products/hooks";
import styles from "./styles.module.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  useSelector((state) => state.products);

  const [quantity, setQuantity] = useState(1);
  useEnsureProductsLoaded();

  const relatedItems = useRelatedProducts(product);
  const { imgRef, onMouseMove, onMouseLeave } = useMagnifyOrigin();
  const {
    expanded: showFull,
    toggle: toggleShowFull,
    canToggle: canToggleDescription,
    displayText: descriptionText,
  } = useProductDescriptionExpandable(product);

  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  if (!product) return null;

  const { effectivePrice, oldPrice, discountPercent } = derivePricing(product);
  const imageSrc = resolveImageUrl(product.image);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  return (
    <Box
      component="section"
      className={`${styles.wrapper} ${styles.mui}`}
      sx={{
        height: showFull || !canToggleDescription ? "auto" : "572px",
        "@media (max-width: 1200px)": { height: "auto" },
      }}
    >
      {/* Mobile Title */}
      <Typography
        component="h1"
        className={`${styles.title} ${styles.titleMobile} ${styles.mui}`}
      >
        {product.title}
      </Typography>

      {/* Left side (Related products) */}
      <Box className={`${styles.left} ${styles.mui}`}>
        {relatedItems.map((relatedItem) => (
          <NavLink
            key={relatedItem.id}
            to={`/products/${relatedItem.id}`}
            className={styles.thumb}
          >
            <img
              src={resolveImageUrl(relatedItem.image)}
              alt={relatedItem.title}
            />
          </NavLink>
        ))}
      </Box>

      {/* Central side (Main image) */}
      <Box
        className={`${styles.imageWrap} ${styles.mui}`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <img
          ref={imgRef}
          src={imageSrc}
          alt={product.title}
          className={styles.mainImage}
        />
      </Box>

      {/* Right side */}
      <Box className={`${styles.info} ${styles.mui}`}>
        <Typography
          component="h1"
          className={`${styles.title} ${styles.desktopTitle} ${styles.mui}`}
        >
          {product.title}
        </Typography>

        {/* Prices */}
        <Box className={`${styles.prices} ${styles.mui}`}>
          <Typography
            component="span"
            className={`${styles.newPrice} ${styles.mui}`}
          >
            ${effectivePrice}
          </Typography>

          {discountPercent !== null && (
            <>
              <Typography
                component="span"
                className={`${styles.oldPrice} ${styles.mui}`}
              >
                ${oldPrice}
              </Typography>
              <Typography
                component="span"
                className={`${styles.badge} ${styles.mui}`}
              >
                -{discountPercent}%
              </Typography>
            </>
          )}
        </Box>

        {/* Controls */}
        <Box className={`${styles.controls} ${styles.mui}`}>
          <QuantitySelector
            quantity={quantity}
            onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
            onIncrease={() => setQuantity(quantity + 1)}
          />
          <Button
            variant="contained"
            className={`${styles.addButton} ${styles.mui}`}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </Box>

        {/* Description */}
        <Typography
          component="h3"
          className={`${styles.descTitle} ${styles.mui}`}
        >
          Description
        </Typography>

        <Typography
          component="p"
          className={`${styles.description} ${styles.mui} ${
            showFull ? styles.expanded : ""
          }`}
        >
          {descriptionText}
        </Typography>

        {canToggleDescription && (
          <Button
            className={`${styles.readMoreBtn} ${styles.mui}`}
            onClick={toggleShowFull}
          >
            {showFull ? "Hide" : "Read more"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Product;
