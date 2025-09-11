// Базовые паттерны
export const namePattern = /^[A-Za-zА-Яа-яЁё\s-]{2,60}$/;
export const phonePattern = /^[+]?[\d\s()-]{7,}$/;
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MESSAGES = {
  nameRequired: "Name is required",
  nameInvalid: "2–60 letters, spaces or hyphens",
  phoneRequired: "Phone is required",
  phoneInvalid: "Use digits, spaces or +. Example: +49 160 1234567",
  emailRequired: "Email is required",
  emailInvalid: "Enter a valid email like name@example.com",
};
