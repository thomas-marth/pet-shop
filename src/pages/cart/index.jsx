import styles from "./styles.module.css";
import SectionHeading from "./../../components/sectionHeading";

function CartPage() {
  return (
    <div className={styles.container}>
      <SectionHeading
        title="Shopping cart"
        to="/"
        buttonText="Back to the store"
      />
    </div>
  );
}

export default CartPage;
