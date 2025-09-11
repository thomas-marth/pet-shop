export const sanitizePhone = (value = "") =>
  value.replace(/[^\d+()\s-]/g, "").trim();

export const normalizeEmail = (value = "") => value.trim().toLowerCase();

export const isNonEmptyString = (v) => typeof v === "string" && v.trim() !== "";
