import Hero from "../../components/hero";
import CategoriesList from "../../components/categoriesList";
import DiscountForm from "./../../components/discountForm";
import SectionHeading from "../../ui/sectionHeading";
import ProductsList from "../../components/productsList";

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
        <CategoriesList limit={4} />
        <DiscountForm />
        <SectionHeading title="Sale" to="/sales" buttonText="All sales" />
        <ProductsList limit={4} sortByDiscount discount />
      </div>
    </>
  );
}

export default HomePage;
