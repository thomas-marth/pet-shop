import styles from "./styles.module.css";
import BreadcrumbsNav from "../../ui/breadcrumbs";
import ProductsList from "../../components/productsList";

function SalesPage() {
  const items = [{ path: "/", label: "Main Page" }, { label: "All sales" }];

  return (
    <div className={styles.container}>
      <BreadcrumbsNav items={items} />
      <h1>Discounted items</h1>
      <ProductsList discount />
    </div>
  );
}

export default SalesPage;
