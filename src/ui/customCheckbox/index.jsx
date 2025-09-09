import Checkbox from "@mui/material/Checkbox";
import clsx from "clsx";
import styles from "./styles.module.css";

export default function CustomCheckbox(props) {
  return (
    <Checkbox
      disableRipple
      className={styles.root}
      icon={<span className={styles.box} />}
      checkedIcon={
        <span className={clsx(styles.box, styles.boxChecked)}>
          <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.285 6.707a1 1 0 0 0-1.57-1.246l-7.41 9.343-3.99-3.99a1 1 0 1 0-1.414 1.415l4.8 4.8a1 1 0 0 0 1.5-.09l8.084-10.232z" />
          </svg>
        </span>
      }
      {...props}
    />
  );
}
