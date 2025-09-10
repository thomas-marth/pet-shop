import styles from "./styles.module.css";
import { Skeleton } from "@mui/material";

const CategoryCardSkeleton = () => {
  return (
    <li className={styles.item}>
      <div className={styles.imageWrapper}>
        <Skeleton
          variant="rounded"
          width="100%"
          height="100%"
          sx={{ borderRadius: "8px" }}
        />
      </div>
      <Skeleton
        width="60%"
        height={24}
        className={styles.name}
        sx={{ mx: "auto" }}
      />
    </li>
  );
};

export default CategoryCardSkeleton;
