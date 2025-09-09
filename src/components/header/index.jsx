import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import ShoppingBag from "../../assets/icons/Vector.png";
import Logo from "../../assets/icons/logo.svg";
import styles from "./styles.module.css";

const Header = () => {
  const itemCount = useSelector((state) => state.cart.items.length);

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
            className={`${styles.badge} ${styles.mui} ${styles.mui2}`}
            badgeContent={itemCount}
            color="primary"
            sx={{
              "& .MuiBadge-badge": {
                color: "#fff",
                textAlign: "center",
                fontFamily: "Montserrat",
                fontSize: "12px",
                fontWeight: 600,
                lineHeight: 0.9,
                padding: "7px",
              },
            }}
          >
            <img className={styles.cart} src={ShoppingBag} alt="Shopping Bag" />
          </Badge>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
