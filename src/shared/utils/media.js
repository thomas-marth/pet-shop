import { CONFIG } from "@/shared/config";

export const resolveImageUrl = (image) => {
  if (!image) return "";
  return image.startsWith("http") ? image : `${CONFIG.API_URL}/${image}`;
};
