import { useSelector } from "react-redux";
import OrderForm from "../orderForm";
import styles from "./styles.module.css";

const OrderDetails = ({ onSuccess }) => {
  const { items } = useSelector((state) => state.cart);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => {
    const price = item.discount ? item.discont_price : item.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Order details</h2>
      <p className={styles.items}>{count} items</p>
      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalPrice}>${total}</span>
      </div>
      <OrderForm onSuccess={onSuccess} />
    </div>
  );
};

export default OrderDetails;
