import { useSyncExternalStore } from "react";
import { getBookCreatures } from "../api/book-creatures-api";
import type { BookCreature } from "./types";

let bookCreatures: BookCreature[] = [];
let initialization: Promise<void> | null = null;
const listeners = new Set<() => void>();

const notify = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => bookCreatures;

export const useBookCreatures = () => useSyncExternalStore(subscribe, getSnapshot);

export const initializeBookCreatures = (): Promise<void> => {
  if (!initialization) {
    initialization = getBookCreatures()
      .then((loadedBookCreatures) => {
        bookCreatures = loadedBookCreatures;
        notify();
      })
      .catch((error) => {
        initialization = null;
        throw error;
      });
  }

  return initialization;
};

export const upsertBookCreature = (bookCreature: BookCreature) => {
  bookCreatures = [
    ...bookCreatures.filter((item) => item.id !== bookCreature.id),
    bookCreature,
  ];
  notify();
};

export const removeBookCreature = (id: number) => {
  bookCreatures = bookCreatures.filter((bookCreature) => bookCreature.id !== id);
  notify();
};
