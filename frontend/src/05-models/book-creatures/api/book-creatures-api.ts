import { API_V1_PATH } from "@/06-shared/api/request/config";
import { request } from "@/06-shared/api/request";
import type {
  BookCreature,
  BookCreatureFilters,
  BookCreatureWriteRequest,
  AverageDefenseLevelResponse,
  RingCountResponse,
  TakeRingsFromHobbitsResponse,
  CreateBookCreatureResponse
} from "../model/types";

const BOOK_CREATURES_API_PATH = `${API_V1_PATH}/book-creatures`;

export const getBookCreatures = async (
  filters: BookCreatureFilters = {},
): Promise<BookCreature[]> => {
  const searchParams = new URLSearchParams();

  if (filters.page !== undefined) searchParams.set("page", String(filters.page));
  if (filters.size !== undefined) searchParams.set("size", String(filters.size));
  if (filters.name) searchParams.set("name", filters.name);

  const query = searchParams.size > 0 ? `?${searchParams.toString()}` : "";
  
  return request<BookCreature[]>(`${BOOK_CREATURES_API_PATH}${query}`);
};

export const getBookCreature = async (id: number): Promise<BookCreature> => {
  return request<BookCreature>(`${BOOK_CREATURES_API_PATH}/${id}`);
};

export const getAverageDefenseLevel = async (): Promise<AverageDefenseLevelResponse> => {
  return request<AverageDefenseLevelResponse>(
    `${BOOK_CREATURES_API_PATH}/avg-def-level`
  );
};

export const getBookCreatureWithMaximumCoordinates = async (): Promise<BookCreature> => {
  return request<BookCreature>(`${BOOK_CREATURES_API_PATH}/max-cords`);
};

export const getRingCountGreaterThan = async (power: number): Promise<RingCountResponse> => {
  return request<RingCountResponse>(`${BOOK_CREATURES_API_PATH}/ring-count?power=${power}`);
};

export const takeRingsFromHobbits = async (): Promise<TakeRingsFromHobbitsResponse> => {
  return request<TakeRingsFromHobbitsResponse>(
    `${BOOK_CREATURES_API_PATH}/take-rings-from-hobbits`,
    { method: "POST" }
  );
};

export const getBookCreatureWithStrongestRing = async (): Promise<BookCreature> => {
  return request<BookCreature>(`${BOOK_CREATURES_API_PATH}/strongest-ring-owner`);
};

export const createBookCreature = async (
  payload: BookCreatureWriteRequest,
): Promise<CreateBookCreatureResponse> => {
  return request<CreateBookCreatureResponse>(BOOK_CREATURES_API_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const updateBookCreature = async (
  id: number,
  payload: BookCreatureWriteRequest,
): Promise<void> => {
  return request<void>(`${BOOK_CREATURES_API_PATH}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const deleteBookCreature = async (id: number): Promise<void> => {
  request<void>(`${BOOK_CREATURES_API_PATH}/${id}`, {
    method: "DELETE",
  });
};
