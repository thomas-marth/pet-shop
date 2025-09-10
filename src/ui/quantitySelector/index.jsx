import { Box, Button } from "@mui/material";
import minusIcon from "@/assets/icons/minus.svg";
import plusIcon from "@/assets/icons/plus.svg";
import styles from "./styles.module.css";

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  fullWidth = false,
}) => {
  return (
    <Box
      className={`${styles.quantityButtons} ${styles.mui} ${
        fullWidth ? styles.fullWidth : ""
      }`}
    >
      <Button
        className={`${styles.quantityMinus} ${styles.mui}`}
        onClick={onDecrease}
      >
        <img src={minusIcon} alt="Button minus " />
      </Button>
      <Button
        className={`${styles.quantityCounter} ${styles.mui} ${styles.styleСlash}`}
        disabled
      >
        {quantity}
      </Button>
      <Button
        className={`${styles.quantityPlus} ${styles.mui}`}
        onClick={onIncrease}
      >
        <img src={plusIcon} alt="Button plus " />
      </Button>
    </Box>
  );
};

export default QuantitySelector;
