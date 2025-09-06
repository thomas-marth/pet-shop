import styles from "./styles.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Snackbar } from "@mui/material";
import { http } from "@/shared/http";

const DiscountForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);

  const onSubmit = async (data) => {
    try {
      await http.post("/sale/send", data);
      reset();
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <div className="container">
      <section className={styles.section}>
        <h2 className={styles.title}>5% off on the first order</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputs}>
            <input
              type="text"
              placeholder="Name"
              className={`${styles.input} ${errors.name ? styles.error : ""}`}
              {...register("name", { required: true })}
            />
            <input
              type="tel"
              placeholder="Phone number"
              className={`${styles.input} ${errors.phone ? styles.error : ""}`}
              {...register("phone", {
                required: true,
                pattern: {
                  value: /^\+?[0-9]{10,15}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            <input
              type="email"
              placeholder="Email"
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          <button type="submit" className={styles.button}>
            Get a discount
          </button>
        </form>
      </section>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Thanks! The code of your discount coupon has been successfully sent to
          your e-mail!
        </Alert>
      </Snackbar>
    </div>
  );
};
export default DiscountForm;
