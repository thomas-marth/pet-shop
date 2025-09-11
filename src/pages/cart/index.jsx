import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SectionHeading from "@/ui/sectionHeading";
import CartList from "@/components/cartList";
import OrderDetails from "@/components/orderDetails";
import OrderModal from "@/components/orderModal";
import { clearCart } from "@/redux/slices/cartSlice";

function CartPage() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleSuccess = () => {
    setIsOrderPlaced(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsOrderPlaced(false);
    dispatch(clearCart());
  };

  return (
    <div className={styles.container}>
      <SectionHeading
        title="Shopping cart"
        to="/"
        buttonText="Back to the store"
      />
      {items.length ? (
        <div className={styles.content}>
          <CartList />
          <OrderDetails onSuccess={handleSuccess} orderPlaced={isOrderPlaced} />
        </div>
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
      <OrderModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default CartPage;
