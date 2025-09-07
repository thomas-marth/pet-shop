// import styles from "./styles.module.css";
import Hero from "../../components/hero";
import CategoriesSection from "../../components/categoriesSection/index";
import DiscountForm from "./../../components/discountForm/index";
import SaleSection from "../../components/saleSection/index";
import SectionHeading from "../../components/sectionHeading";

function HomePage() {
  return (
    <>
      <Hero />
      <div className="container">
        <SectionHeading
          title="Categories"
          to="/categories"
          buttonText="All categories"
        />
        <CategoriesSection limit={4} />
        <DiscountForm />
        <SectionHeading title="Sale" to="/sales" buttonText="All sales" />
        <SaleSection />
      </div>
    </>
    // <div className={styles.container}>
    // </div>
  );
}

export default HomePage;
