import { namePattern, phonePattern, emailPattern, MESSAGES } from "./patterns";

export const nameRules = (opts = {}) => ({
  required: opts.requiredMsg || MESSAGES.nameRequired,
  pattern: {
    value: namePattern,
    message: opts.invalidMsg || MESSAGES.nameInvalid,
  },
});

export const phoneRules = (opts = {}) => ({
  required: opts.requiredMsg || MESSAGES.phoneRequired,
  pattern: {
    value: phonePattern,
    message: opts.invalidMsg || MESSAGES.phoneInvalid,
  },
});

export const emailRules = (opts = {}) => ({
  required: opts.requiredMsg || MESSAGES.emailRequired,
  pattern: {
    value: emailPattern,
    message: opts.invalidMsg || MESSAGES.emailInvalid,
  },
});
