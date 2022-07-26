import { ClientModele } from "./ClientModele";
import { ModelModele } from "./ModelModele";

export interface CommandeModele {
  id: number;
  numeroCommande: string;
  typeCommande: string;
  nomCommande: string;
  avance: string;
  relicat: string;
  dateCommande: string;
  prix: string;
  model: ModelModele;
  user: ClientModele;
  typeDeTissuClient: string,
  tailleTissuClient: string,
  couleurTissuClient: string
}
