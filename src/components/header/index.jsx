import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Logo from "@/assets/icons/logo.svg";
import { selectCartCount } from "@/redux/selectors/cart";
import CartBadge from "./CartBadge";
import styles from "./styles.module.css";

const Header = () => {
  const itemCount = useSelector(selectCartCount);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const toggleDrawer = (open) => () => setIsDrawerOpen(open);

  const navLinks = useMemo(
    () => (
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
    ),
    []
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo} aria-label="Home page">
          <img src={Logo} alt="Logo" />
        </NavLink>

        {isMobile ? (
          <div className={styles.actions}>
            <CartBadge count={itemCount} />
            <IconButton
              aria-label="Open navigation menu"
              onClick={toggleDrawer(true)}
              className={`${styles.menuBtn} ${styles.mui}`}
              sx={{ marginLeft: "9px" }}
            >
              <MenuIcon
                className={`${styles.menuIcon} `}
                sx={{ fontSize: "40px" }}
              />
            </IconButton>

            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                onClick={toggleDrawer(false)}
                className={styles.drawer}
                role="navigation"
                aria-label="Primary navigation"
              >
                {navLinks}
              </Box>
            </Drawer>
          </div>
        ) : (
          <>
            <nav className={styles.nav} aria-label="Primary navigation">
              {navLinks}
            </nav>
            <CartBadge count={itemCount} />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
