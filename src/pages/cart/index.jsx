import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import SectionHeading from "../../ui/sectionHeading";
import CartList from "@/components/cartList";

function CartPage() {
  const { items } = useSelector((state) => state.cart);
  return (
    <div className={styles.container}>
      <SectionHeading
        title="Shopping cart"
        to="/"
        buttonText="Back to the store"
      />
      {items.length ? (
        <CartList />
      ) : (
        <>
          <p className={styles.cartMessage}>
            Looks like you have no items in your basket currently.
          </p>
          <Button
            className={`${styles.continueShoppingBtn} ${styles.mui}`}
            component={NavLink}
            to="/"
            variant="contained"
          >
            Continue Shopping
          </Button>
        </>
      )}
    </div>
  );
}

export default CartPage;
