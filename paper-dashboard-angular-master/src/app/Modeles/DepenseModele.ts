import { ClientModele } from "./ClientModele";

export interface DepenseModele {
  id: number;
  type: string;
  libelle: string;
  prix: string;
  description: string;
  date: string;
  user: ClientModele
}
