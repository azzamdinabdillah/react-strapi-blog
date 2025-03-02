import axios from "axios";
import { HttpRequest } from "../interface/HttpRequest";
import api from "./axios-config";

export async function httpRequest({ type, url, body, config }: HttpRequest) {
  let response = null;

  try {
    switch (type) {
      case "get":
        response = await api.get(url);
        return response.data.data;
        break;

      case "post":
        response = await api.post(url, body, config);
        return response.data;
        break;

      default:
        break;
    }
  } catch (error) {
    return errorCatchAxios(error);
  }
}

export function errorCatchAxios(error: any) {
  if (axios.isAxiosError(error)) {
    throw error.response?.data.error.message;
  } else {
    throw "Unexpected Error : " + error;
  }
}
