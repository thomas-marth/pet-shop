import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import ShoppingBag from "../../assets/icons/Vector.png";
import Logo from "../../assets/icons/logo.svg";
import styles from "./styles.module.css";

const Header = () => {
  const itemCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const [animateCart, setAnimateCart] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const navLinks = (
    <>
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
    </>
  );

  const cartLink = (
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
          className={`${styles.cart} ${animateCart ? styles.cartAnimated : ""}`}
          src={ShoppingBag}
          alt="Shopping Bag"
        />
      </Badge>
    </NavLink>
  );

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

        <div className={styles.actions}>
          {isMobile ? (
            <>
              {cartLink}
              <IconButton
                aria-label="Open navigation menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  onClick={toggleDrawer(false)}
                  sx={{
                    width: 250,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 2,
                  }}
                >
                  {navLinks}
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <nav className={styles.nav} aria-label="Primary navigation">
                {navLinks}
              </nav>
              {cartLink}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
