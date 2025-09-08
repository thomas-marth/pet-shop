import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { CONFIG } from "@/shared/config";
import { fetchProducts } from "@/redux/slices/productSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import styles from "./styles.module.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [showFull, setShowFull] = useState(false);
  const [related, setRelated] = useState([]);

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

  return (
    <div className="container">
      <section
        className={styles.wrapper}
        style={{ height: showFull ? "auto" : "572px" }}
      >
        <div className={styles.left}>
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
        </div>
        {/* <div className={styles.imageWrap}> */}
        <img src={imgSrc} alt={product.title} className={styles.mainImage} />
        {/* </div> */}
        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.prices}>
            <span className={styles.newPrice}>
              ${discount ? product.discont_price : product.price}
            </span>
            {discount && (
              <span className={styles.oldPrice}>${product.price}</span>
            )}
            {discount && <span className={styles.badge}>-{discount}%</span>}
          </div>
          <div className={styles.controls}>
            <div className={styles.counter}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className={styles.countBtn}
              >
                -
              </button>
              <span className={styles.countValue}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className={styles.countBtn}
              >
                +
              </button>
            </div>
            <Button
              variant="contained"
              className={styles.addButton}
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
          </div>
          <h3 className={styles.descTitle}>Description</h3>
          <p
            className={`${styles.description} ${
              showFull ? styles.expanded : ""
            }`}
          >
            {product.description}
          </p>
          {!showFull && product.description?.length > 250 && (
            <button
              className={styles.readMore}
              onClick={() => setShowFull(true)}
            >
              Read more
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Product;
