import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import { CONFIG } from "@/shared/config";
import { fetchProducts } from "@/redux/slices/productSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import minusIcon from "../../assets/icons/minus.svg";
import plusIcon from "../../assets/icons/plus.svg";
import styles from "./styles.module.css";

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

  const handleAdd = () => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
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
      className={styles.wrapper}
      sx={{
        height: showFull ? "auto" : "572px",
        "@media (max-width: 1200px)": { height: "auto" },
      }}
    >
      {/* Left side */}

      <Box className={styles.left}>
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
        <Typography component="h1" className={`${styles.title} ${styles.mui}`}>
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
          {/* <ButtonGroup
            variant="outlined"
            sx={{
              borderColor: "#ddd",
              borderRadius: "6px",
              "& .MuiButton-root": {
                maxWidth: "200px",
                height: "58px",
                px: 3.34,
                fontSize: "20px",
                color: "#282828",
                lineHeight: 1,
                borderColor: "#ddd",
              },
              "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                borderColor: "#ddd",
              },
              "& .MuiButtonGroup-grouped:not(:first-of-type)": {
                borderColor: "#ddd",
              },
            }}
          > */}
          <Box>
            <Button
              className={`${styles.quantityMinus} ${styles.mui}`}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <img src={minusIcon} alt="Button minus " />
            </Button>
            <Button
              className={`${styles.quantityCounter} ${styles.mui} ${styles.styleСlash}`}
              disabled
            >
              {quantity}
            </Button>
            <Button
              className={`${styles.quantityPlus} ${styles.mui}`}
              onClick={() => setQuantity(quantity + 1)}
            >
              <img src={plusIcon} alt="Button plus " />
            </Button>
          </Box>
          {/* </ButtonGroup> */}
          <Button
            variant="contained"
            className={`${styles.addButton} ${styles.mui}`}
            onClick={handleAdd}
            sx={{
              fontFamily: "Montserrat",
              fontSize: "20px",
              fontWeight: 600,
              textTransform: "none",
              lineHeight: 1.3,
              backgroundColor: "#0D50FF",
              "&:hover": { backgroundColor: "#000" },
            }}
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
          {product.description}
        </Typography>
        {product.description?.length > 250 &&
          (showFull ? (
            <Button
              className={`${styles.readMore} ${styles.mui}`}
              onClick={() => setShowFull(false)}
              sx={{
                background: "none",
                border: "none",
                color: "#0d50ff",
                fontSize: "20px",
                fontWeight: 500,
                textAlign: "left",
                marginBottom: "16px",
                textTransform: "none",
                padding: 0,
                minWidth: "auto",
              }}
            >
              Hide
            </Button>
          ) : (
            <Button
              className={`${styles.readMore} ${styles.mui}`}
              onClick={() => setShowFull(true)}
              sx={{
                background: "none",
                border: "none",
                color: "#0d50ff",
                fontSize: "20px",
                fontWeight: 500,
                textAlign: "left",
                marginBottom: "16px",
                textTransform: "none",
                padding: 0,
                minWidth: "auto",
              }}
            >
              Read more
            </Button>
          ))}
      </Box>
    </Box>
  );
};
export default Product;
