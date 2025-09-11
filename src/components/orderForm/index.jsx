import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { http } from "@/shared/http";

const namePattern = /^[A-Za-zА-Яа-яЁё\s-]{2,60}$/;
const phonePattern = /^[+]?[\d\s()-]{7,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const OrderForm = ({ onSuccess, orderPlaced }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await http.post("/order/send", data);
      reset();
      onSuccess();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <input
        type="text"
        placeholder="Name"
        className={`${styles.input} ${errors.name ? styles.error : ""}`}
        {...register("name", {
          required: "Name is required",
          pattern: {
            value: namePattern,
            message:
              "Name must consist of 2–60 characters, incl. spaces and hyphens",
          },
          minLength: 2,
          maxLength: 60,
        })}
      />
      {errors.name && (
        <span className={styles.errorMessage}>{errors.name.message}</span>
      )}
      <input
        type="tel"
        placeholder="Phone number"
        className={`${styles.input} ${errors.phone ? styles.error : ""}`}
        {...register("phone", {
          required: "Phone number is required",
          pattern: {
            value: phonePattern,
            message: "Phone number must be at least 7 digits",
          },
        })}
      />
      {errors.phone && (
        <span className={styles.errorMessage}>{errors.phone.message}</span>
      )}
      <input
        type="email"
        placeholder="Email"
        className={`${styles.input} ${errors.email ? styles.error : ""}`}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: emailPattern,
            message: "Enter a valid email address (example: name@example.com)",
          },
        })}
      />
      {errors.email && (
        <span className={styles.errorMessage}>{errors.email.message}</span>
      )}
      <button
        type="submit"
        disabled={isSubmitting || orderPlaced}
        className={`${styles.button} ${orderPlaced ? styles.submitted : ""}`}
      >
        {orderPlaced ? "The Order is Placed" : "Order"}
      </button>
    </form>
  );
};

export default OrderForm;
