import axios from "axios";
import { HttpRequest } from "../interface/HttpRequest";

export async function httpRequest({ type, url }: HttpRequest) {
  const env = import.meta.env;
  let response = null;

  switch (type) {
    case "get":
      response = await axios.get(env.VITE_API_URL + url);
      return response.data.data;
      break;

    default:
      break;
  }
}
