// import styles from "./styles.module.css";
import Hero from "../../components/hero";
import CategoriesSection from "../../components/categoriesSection/index";
import DiscountForm from "./../../components/discountForm/index";
import SaleSection from "../../components/saleSection/index";

function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <DiscountForm />
      <SaleSection />
    </>
    // <div className={styles.container}>
    // </div>
  );
}

export default HomePage;
