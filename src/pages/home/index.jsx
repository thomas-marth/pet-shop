import Hero from "../../components/hero";
import CategoriesSection from "../../components/categoriesSection";
import DiscountForm from "./../../components/discountForm";
import SectionHeading from "../../ui/sectionHeading";
import ProductsSection from "../../components/productsSection";

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
        <ProductsSection limit={4} sortByDiscount discount />
      </div>
    </>
    // <div className={styles.container}>
    // </div>
  );
}

export default HomePage;
