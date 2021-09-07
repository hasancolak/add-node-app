import { SERVER_URL } from "../utils/constants";

/**
 * @function getFetch
 * @param  {string} path
 * @returns Promise
 */
export async function getFetch<T>(path: string): Promise<T> {
  try {
    const response = await fetch(`${SERVER_URL}${path}`, { method: "GET" });
    return (await response.json()) as T;
  } catch (e) {
    throw e;
  }
}
