import { API_V1_PATH } from "@/06-shared/api/request/config";
import { request } from "@/06-shared/api/request";
import type { MagicCity } from "../model/types";

const MAGIC_CITIES_API_PATH = `${API_V1_PATH}/magic-cities`;

export const getMagicCities = (): Promise<MagicCity[]> => {
  return request<MagicCity[]>(MAGIC_CITIES_API_PATH);
}

export const createMagicCity = async (payload: MagicCity): Promise<void> =>
  request<void>(MAGIC_CITIES_API_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const getMagicCity = async (name: string): Promise<MagicCity> => {
  return request<MagicCity>(`${MAGIC_CITIES_API_PATH}/${encodeURIComponent(name)}`);
}

export const updateMagicCity = async (name: string, payload: MagicCity): Promise<void> => {
  request<void>(`${MAGIC_CITIES_API_PATH}/${encodeURIComponent(name)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export const deleteMagicCity = async (name: string): Promise<void> => {
  request<void>(
    `${MAGIC_CITIES_API_PATH}/${encodeURIComponent(name)}`,
    { method: "DELETE" }
  );
}
  
