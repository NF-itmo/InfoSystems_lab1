CREATE TYPE BookCreatureType AS ENUM (
    'HOBBIT',
    'ELF',
    'HUMAN'
);

CREATE TABLE IF NOT EXISTS Coordinates (
    id SERIAL PRIMARY KEY,

    x DOUBLE PRECISION NOT NULL CHECK (x > -126),
    y INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS Ring (
    name TEXT PRIMARY KEY CHECK (name != ''),

    power INTEGER NOT NULL CHECK (power > 0),
    weight BIGINT NOT NULL CHECK (weight > 0)
);

CREATE TABLE IF NOT EXISTS MagicCity (
    name TEXT PRIMARY KEY CHECK (name != ''),

    area BIGINT NOT NULL CHECK (area > 0),
    population INTEGER NOT NULL CHECK (population > 0),
    establishment_date TIMESTAMP,
    governor BookCreatureType NOT NULL,
    capital BOOLEAN NOT NULL,
    population_density INTEGER NOT NULL CHECK (population_density > 0)
);

CREATE TABLE IF NOT EXISTS BookCreature (
    id SERIAL PRIMARY KEY CHECK (id > 0),

    name TEXT NOT NULL CHECK (name != ''),
    coordinates_id INTEGER NOT NULL REFERENCES Coordinates(id),
    creation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    age INTEGER NOT NULL CHECK (age > 0),
    creature_type BookCreatureType NOT NULL,
    creature_location_name TEXT REFERENCES MagicCity(name),
    attack_level REAL NOT NULL CHECK (attack_level > 0),
    defense_level DOUBLE PRECISION NOT NULL CHECK (defense_level > 0),
    ring_name TEXT REFERENCES Ring(name)
);