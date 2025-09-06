// import styles from "./styles.module.css";
import Hero from "../../components/hero";
import CategoriesSection from "../../components/categoriesSection/index";
import DiscountForm from "./../../components/discountForm/index";
import SalesSection from "../../components/saleSection/index";

function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <DiscountForm />
      <SalesSection />
    </>
    // <div className={styles.container}>
    // </div>
  );
}

export default HomePage;
