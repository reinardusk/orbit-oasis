export type PlanetsData = {
  count: string;
  next: string;
  previous: string;
  results?: Planet[];
};
export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type HomeNavigationParamsList = {
  ListPlanet: undefined;
  DetailPlanet: { name: string; url: string };
};

export type TabIconName =
  | "planet"
  | "planet-outline"
  | "heart"
  | "heart-outline";

export type DetailPlanetParamsProps = {
  name: string;
  url: string;
};
