export {
  createBookCreature,
  deleteBookCreature,
  getAverageDefenseLevel,
  getBookCreature,
  getBookCreatureWithMaximumCoordinates,
  getBookCreatureWithStrongestRing,
  getBookCreatures,
  getRingCountGreaterThan,
  takeRingsFromHobbits,
  updateBookCreature
} from "./api/book-creatures-api";

export {
  initializeBookCreatures,
  loadBookCreatures,
  removeBookCreature,
  upsertBookCreature,
  useBookCreatures,
} from "./model/store";

export type {
  BookCreature,
  BookCreatureFilters,
  BookCreatureType,
  AverageDefenseLevelResponse,
  BookCreatureWriteRequest,
  CreateBookCreatureResponse,
  RingCountResponse,
  TakeRingsFromHobbitsResponse
} from "./model/types";
