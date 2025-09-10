import { useSelector } from "react-redux";
import CartItem from "../cartItem";
import styles from "./styles.module.css";

const CartList = () => {
  const { items } = useSelector((state) => state.cart);
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default CartList;
