import BreadcrumbsNav from "@/components/breadcrumbs";
import styles from "./styles.module.css";
import SaleSection from "./../../components/saleSection/index";

function SalesPage() {
  const items = [{ path: "/", label: "Main Page" }, { label: "All sales" }];

  return (
    <div className={styles.container}>
      <BreadcrumbsNav items={items} />
      <h1>Discounted items</h1>
      <SaleSection />
    </div>
  );
}

export default SalesPage;
