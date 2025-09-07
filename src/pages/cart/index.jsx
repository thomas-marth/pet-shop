import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import SectionHeading from "../../ui/sectionHeading";

function CartPage() {
  return (
    <div className={styles.container}>
      <SectionHeading
        title="Shopping cart"
        to="/"
        buttonText="Back to the store"
      />
      <p className={styles.cartMessage}>
        Looks like you have no items in your basket currently.
      </p>
      <Button
        component={NavLink}
        to="/"
        variant="contained"
        sx={{
          fontFamily: "Montserrat",
          fontSize: "20px",
          fontWeight: 600,
          textTransform: "none",
          lineHeight: 1.3,
          backgroundColor: "#0D50FF",
          marginBottom: "80px",
          padding: "16px 56px",
          "&:hover": {
            backgroundColor: "#000",
          },
        }}
      >
        Continue Shopping
      </Button>
    </div>
  );
}

export default CartPage;
