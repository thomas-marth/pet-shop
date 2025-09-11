import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { CONFIG } from "@/shared/config";
import { fetchProducts } from "@/redux/slices/productSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import QuantitySelector from "../../ui/quantitySelector";
import styles from "./styles.module.css";

const MAX_DESCRIPTION_LENGTH = 450;
const MIN_HIDDEN_LENGTH = 150;

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [showFull, setShowFull] = useState(false);
  const [related, setRelated] = useState([]);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchProducts());
    }
  }, [items.length, dispatch]);

  useEffect(() => {
    if (product && items.length) {
      const same = items.filter(
        (p) => p.categoryId === product.categoryId && p.id !== product.id
      );
      const random = [...same].sort(() => 0.5 - Math.random()).slice(0, 3);
      setRelated(random);
    }
  }, [product, items]);

  if (!product) return null;

  const discount =
    product.discont_price && product.discont_price < product.price
      ? Math.round(
          ((product.price - product.discont_price) / product.price) * 100
        )
      : null;

  const imgSrc = product.image?.startsWith("http")
    ? product.image
    : `${CONFIG.API_URL}/${product.image}`;
  const description = product.description || "";
  const hiddenChars = description.length - MAX_DESCRIPTION_LENGTH;
  const shouldShowButton = hiddenChars >= MIN_HIDDEN_LENGTH;
  const handleAdd = () => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleMouseMove = (event) => {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    if (imgRef.current) {
      imgRef.current.style.transformOrigin = `${x}% ${y}%`;
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transformOrigin = "center";
    }
  };

  return (
    <Box
      component="section"
      className={`${styles.wrapper} ${styles.mui}`}
      sx={{
        height: showFull || !shouldShowButton ? "auto" : "572px",
        "@media (max-width: 1200px)": { height: "auto" },
      }}
    >
      <Typography
        component="h1"
        className={`${styles.title} ${styles.titleMobile} ${styles.mui}`}
      >
        {product.title}
      </Typography>
      {/* Left side */}

      <Box className={`${styles.left} ${styles.mui}`}>
        {related.map((p) => {
          const rSrc = p.image?.startsWith("http")
            ? p.image
            : `${CONFIG.API_URL}/${p.image}`;
          return (
            <NavLink
              key={p.id}
              to={`/products/${p.id}`}
              className={styles.thumb}
            >
              <img src={rSrc} alt={p.title} />
            </NavLink>
          );
        })}
      </Box>

      {/* Central side (Main Image) */}

      <Box
        className={`${styles.imageWrap} ${styles.mui}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          src={imgSrc}
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
        <Box className={`${styles.prices} ${styles.mui}`}>
          <Typography
            component="span"
            className={`${styles.newPrice} ${styles.mui}`}
          >
            ${discount ? product.discont_price : product.price}
          </Typography>
          {discount && (
            <>
              <Typography
                component="span"
                className={`${styles.oldPrice} ${styles.mui}`}
              >
                ${product.price}
              </Typography>
              <Typography
                component="span"
                className={`${styles.badge} ${styles.mui}`}
              >
                -{discount}%
              </Typography>
            </>
          )}
        </Box>
        <Box className={`${styles.controls} ${styles.mui}`}>
          <QuantitySelector
            quantity={quantity}
            onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
            onIncrease={() => setQuantity(quantity + 1)}
          />
          <Button
            variant="contained"
            className={`${styles.addButton} ${styles.mui}`}
            onClick={handleAdd}
          >
            Add to cart
          </Button>
        </Box>

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
          {shouldShowButton && !showFull
            ? `${description.slice(0, MAX_DESCRIPTION_LENGTH).trimEnd()}...`
            : description}
        </Typography>
        {shouldShowButton &&
          (showFull ? (
            <Button
              className={`${styles.hideBtn} ${styles.mui}`}
              onClick={() => setShowFull(false)}
            >
              Hide
            </Button>
          ) : (
            <Button
              className={`${styles.readMoreBtn} ${styles.mui}`}
              onClick={() => setShowFull(true)}
            >
              Read more
            </Button>
          ))}
      </Box>
    </Box>
  );
};
export default Product;
