import { InfoModel } from "@/types/InfoModel";
export interface RequestModel {
  info: InfoModel;
  results: CharacterModel[];
  error?: string;
}
export interface CharacterModel {
  id: number;
  gender: string;
  name: string;
  species: string;
  status: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
  origin?: {
    name: string;
    url: string;
  };
  type: string;
  created: string;
  dimension?: string;
  episode?: string[];
  originName?: string;
  isFavorite?: boolean;
  clickedFrom?: string;
}

export interface CharacterSearchModel {
  name: string;
  image: string;
}