import BreadcrumbsNav from "@/components/breadcrumbs";
import styles from "./styles.module.css";

function SalesPage() {
  const items = [{ path: "/", label: "Main Page" }, { label: "All sales" }];

  return (
    <div className={styles.container}>
      <BreadcrumbsNav items={items} />
      <h1>Sales</h1>
    </div>
  );
}

export default SalesPage;
