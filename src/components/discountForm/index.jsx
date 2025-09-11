import styles from "./styles.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Snackbar } from "@mui/material";
import { http } from "@/shared/http";

import { nameRules, phoneRules, emailRules } from "@/shared/validation/rules";
import { sanitizePhone, normalizeEmail } from "@/shared/validation/utils";

const DiscountForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ mode: "onChange" });

  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message:
      "Thanks! The code of your discount coupon has been successfully sent to your e-mail!",
  });

  const onSubmit = async (data) => {
    const payload = {
      name: data.name?.trim(),
      phone: sanitizePhone(data.phone),
      email: normalizeEmail(data.email),
    };

    try {
      await http.post("/sale/send", payload);
      reset();
      setSnack({
        open: true,
        severity: "success",
        message:
          "Thanks! The code of your discount coupon has been successfully sent to your e-mail!",
      });
    } catch (error) {
      setSnack({
        open: true,
        severity: "error",
        message:
          "Something went wrong. Please try again later or check your connection.",
      });
      console.error(error);
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnack((s) => ({ ...s, open: false }));
  };

  const buttonLabel = isSubmitting
    ? "Sending..."
    : isSubmitSuccessful
    ? "Request Submitted"
    : "Get a discount";

  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.title}>5% off on the first order</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
          <div className={styles.inputs}>
            {/* Name */}
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Name"
                className={`${styles.input} ${errors.name ? styles.error : ""}`}
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
                autoComplete="name"
                {...register("name", nameRules())}
              />
              {errors.name && (
                <span id="name-error" className={styles.helper}>
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className={styles.field}>
              <input
                type="tel"
                placeholder="Phone number"
                className={`${styles.input} ${
                  errors.phone ? styles.error : ""
                }`}
                aria-invalid={!!errors.phone}
                aria-describedby="phone-error"
                inputMode="tel"
                autoComplete="tel"
                {...register("phone", phoneRules())}
                onChange={(e) => {
                  const v = sanitizePhone(e.target.value);
                  setValue("phone", v, { shouldValidate: true });
                }}
              />
              {errors.phone && (
                <span id="phone-error" className={styles.helper}>
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className={styles.field}>
              <input
                type="email"
                placeholder="Email"
                className={`${styles.input} ${
                  errors.email ? styles.error : ""
                }`}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                inputMode="email"
                autoComplete="email"
                {...register("email", emailRules())}
                onBlur={(e) => {
                  const v = normalizeEmail(e.target.value);
                  setValue("email", v, { shouldValidate: true });
                }}
              />
              {errors.email && (
                <span id="email-error" className={styles.helper}>
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`${styles.button} ${
              isSubmitSuccessful ? styles.submitted : ""
            }`}
            disabled={isSubmitting}
          >
            {buttonLabel}
          </button>
        </form>
      </section>

      <Snackbar
        open={snack.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DiscountForm;
