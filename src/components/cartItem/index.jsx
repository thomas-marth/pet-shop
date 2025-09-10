import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import QuantitySelector from "@/ui/quantitySelector";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import { CONFIG } from "@/shared/config";
import styles from "./styles.module.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const price = item.discount ? item.discont_price : item.price;
  const oldPrice = item.discount ? item.price : null;
  const imgSrc = item.image?.startsWith("http")
    ? item.image
    : `${CONFIG.API_URL}/${item.image}`;

  const handleRemove = () => dispatch(removeFromCart(item.id));
  const handleIncrease = () =>
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  const handleDecrease = () =>
    dispatch(
      updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) })
    );

  return (
    <Box className={`${styles.item} ${styles.mui}`} component="li">
      <img src={imgSrc} alt={item.title} className={styles.image} />
      <Box className={styles.info}>
        <Box className={`${styles.titleWrapper} ${styles.mui}`}>
          <Typography
            component="h3"
            className={`${styles.title} ${styles.mui}`}
          >
            {item.title}
          </Typography>
          <IconButton
            className={styles.removeBtn}
            onClick={handleRemove}
            aria-label="remove"
          >
            <CloseIcon
              sx={{ width: "24px", height: "24px", color: "#282828" }}
            />
          </IconButton>
        </Box>
        <Box className={styles.controls}>
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            fullWidth={false}
          />
          <Box className={styles.prices}>
            <Typography
              component="span"
              className={`${styles.newPrice} ${styles.mui}`}
            >
              ${price}
            </Typography>

            <Typography
              component="span"
              className={`${styles.oldPrice} ${styles.mui}`}
            >
              ${oldPrice}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
