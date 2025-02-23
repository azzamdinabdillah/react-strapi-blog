import axios from "axios";
import { HttpRequest } from "../interface/HttpRequest";

export async function httpRequest({ type, url, body }: HttpRequest) {
  const env = import.meta.env;
  let response = null;

  try {
    switch (type) {
      case "get":
        response = await axios.get(env.VITE_API_URL + url);
        return response.data.data;
        break;

      case "post":
        response = await axios.post(env.VITE_API_URL + url, body);
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
