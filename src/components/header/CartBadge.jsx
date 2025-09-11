import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingBag from "@/assets/icons/Vector.png";
import styles from "./styles.module.css";

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
};

const CartBadge = ({ count }) => {
  const [animateCart, setAnimateCart] = useState(false);
  const timeoutRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const play = () => {
      if (reducedMotion) return;
      setAnimateCart(true);
      timeoutRef.current = setTimeout(() => setAnimateCart(false), 500);
    };

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (count > 0) {
      play();

      const loop = () => {
        play();
        timeoutRef.current = setTimeout(loop, 6000);
      };
      timeoutRef.current = setTimeout(loop, 6000);
    } else {
      setAnimateCart(false);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [count, reducedMotion]);

  const ariaLabel = useMemo(
    () =>
      count ? `Cart, ${count} item${count !== 1 ? "s" : ""}` : "Cart, empty",
    [count]
  );

  return (
    <NavLink to="/cart" className={styles.cartLink} aria-label="Cart">
      <Badge className={styles.badge} badgeContent={count} color="primary">
        <img
          className={`${styles.cart} ${animateCart ? styles.cartAnimated : ""}`}
          src={ShoppingBag}
          alt={ariaLabel}
        />
      </Badge>
    </NavLink>
  );
};

export default CartBadge;
