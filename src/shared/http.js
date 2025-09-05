import axios from "axios";
import { CONFIG } from "@/shared/config";

export const http = axios.create({
  baseURL: CONFIG.API_URL,
});
