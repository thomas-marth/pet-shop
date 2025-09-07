import BreadcrumbsNav from "@/components/breadcrumbs";
import styles from "./styles.module.css";
import ProductsSection from "../../components/productsSection";

function SalesPage() {
  const items = [{ path: "/", label: "Main Page" }, { label: "All sales" }];

  return (
    <div className={styles.container}>
      <BreadcrumbsNav items={items} />
      <h1>Discounted items</h1>
      <ProductsSection discount />
    </div>
  );
}

export default SalesPage;
