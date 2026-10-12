export type Coordinates = {
  id: number;
  x: number;
  y: number;
};

export type CoordinatesCreateRequest = Omit<Coordinates, "id">;
