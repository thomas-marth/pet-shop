import { NavLink } from "react-router-dom";
import ShoppingBag from "../../assets/icons/Vector.png";
import Logo from "../../assets/icons/logo.svg";
import styles from "./styles.module.css";

const Header = () => {
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
          <img src={ShoppingBag} alt="Shopping Bag" />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
