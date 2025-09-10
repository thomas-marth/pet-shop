import { useState } from "react";
import styles from "./styles.module.css";
import BreadcrumbsNav from "../../ui/breadcrumbs";
import ProductsList from "../../components/productsList";
import ProductFilter from "../../ui/productFilter";

function SalesPage() {
  const items = [{ path: "/", label: "Main Page" }, { label: "All sales" }];
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    discountOnly: true,
    sortBy: "default",
  });

  return (
    <div className={styles.container}>
      <BreadcrumbsNav items={items} />
      <h1 className={styles.title}>Discounted items</h1>
      <ProductFilter filters={filters} onChange={setFilters} hideDiscount />
      <ProductsList filters={filters} />
    </div>
  );
}

export default SalesPage;
