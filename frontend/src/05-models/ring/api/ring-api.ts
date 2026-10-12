import { API_V1_PATH } from "@/06-shared/api/request/config";
import { request } from "@/06-shared/api/request";
import type { Ring } from "../model/types";

const RINGS_API_PATH = `${API_V1_PATH}/rings`;

export const getRings = (): Promise<Ring[]> => {
  return request<Ring[]>(RINGS_API_PATH);
} 

export const createRing = async (payload: Ring): Promise<void> => {
  return request<void>(RINGS_API_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const getRing = async (name: string): Promise<Ring> => {
  return request<Ring>(`${RINGS_API_PATH}/${encodeURIComponent(name)}`);
};

export const updateRing = async (name: string, payload: Ring): Promise<void> => {
  return request<void>(`${RINGS_API_PATH}/${encodeURIComponent(name)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const deleteRing = async (name: string): Promise<void> => {
  return request<void>(`${RINGS_API_PATH}/${encodeURIComponent(name)}`, {
    method: "DELETE",
  });
};
