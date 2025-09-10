import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import ShoppingBag from "../../assets/icons/Vector.png";
import Logo from "../../assets/icons/logo.svg";
import styles from "./styles.module.css";

const Header = () => {
  const itemCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    let intervalId;
    let timeoutId;

    const triggerAnimation = () => {
      setAnimateCart(true);
      timeoutId = setTimeout(() => setAnimateCart(false), 500);
    };

    if (itemCount > 0) {
      triggerAnimation();
      intervalId = setInterval(triggerAnimation, 6000);
    } else {
      setAnimateCart(false);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [itemCount]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo} aria-label="Home page">
          <img src={Logo} alt="Logo" />
        </NavLink>
        {/* Navigation */}
        <nav className={styles.nav} aria-label="Primary navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Main Page
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            All products
          </NavLink>
          <NavLink
            to="/sales"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            All sales
          </NavLink>
        </nav>
        {/* Cart icon */}
        <NavLink to="/cart" className={styles.cartLink} aria-label="Cart">
          <Badge
            slotProps={{ badge: { className: styles.badge } }}
            badgeContent={itemCount}
            color="primary"
            sx={{
              "& .MuiBadge-badge": {
                color: "#fff",
                backgroundColor: "#0D50FF",
                textAlign: "center",
                fontFamily: "Montserrat",
                fontSize: "12px",
                fontWeight: 600,
                lineHeight: 0.9,
                borderRadius: "50%",
                padding: "7px",
                width: "26px",
                height: "26px",
                top: "19px",
                right: "36px",
              },
            }}
          >
            <img
              className={`${styles.cart} ${
                animateCart ? styles.cartAnimated : ""
              }`}
              src={ShoppingBag}
              alt="Shopping Bag"
            />
          </Badge>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
