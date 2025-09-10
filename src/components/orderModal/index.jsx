import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.css";

const OrderModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="close">
          <CloseIcon sx={{ color: "#fff", width: "35px", height: "35px" }} />
        </button>
        <h2 className={styles.title}>Congratulations!</h2>
        <p className={styles.text}>
          Your order has been successfully placed on the website.
        </p>
        <p className={styles.text}>
          A manager will contact you shortly to confirm your order.
        </p>
      </div>
    </div>
  );
};

export default OrderModal;
