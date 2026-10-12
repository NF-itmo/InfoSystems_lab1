import { API_V1_PATH } from "@/06-shared/api/request/config";
import { request } from "@/06-shared/api/request";
import type { Coordinates, CoordinatesCreateRequest } from "../model/types";

const COORDINATES_API_PATH = `${API_V1_PATH}/coordinates`;

export const getCoordinatesList = (): Promise<Coordinates[]> => {
  return request<Coordinates[]>(COORDINATES_API_PATH, {
    method: "POST"
  });
}

export const createCoordinates = async (payload: CoordinatesCreateRequest): Promise<Coordinates> => {
  return request<Coordinates>(COORDINATES_API_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export const getCoordinates = async (id: number): Promise<Coordinates> => {
  return request<Coordinates>(`${COORDINATES_API_PATH}/${id}`, {
    method: "GET",
  });
}

export const updateCoordinates = async (payload: Coordinates): Promise<void> => {
  request<void>(`${COORDINATES_API_PATH}/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export const deleteCoordinates = async (id: number): Promise<void> => {
  request<void>(`${COORDINATES_API_PATH}/${id}`, {
    method: "DELETE"
  });
}
