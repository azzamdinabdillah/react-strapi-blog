import { AxiosRequestConfig } from "axios";

export interface HttpRequest {
  type: "get" | "post" | "delete" | "put";
  url: string;
  body?: any;
  config?: AxiosRequestConfig;
}
