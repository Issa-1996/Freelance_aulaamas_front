import { CommandeModele } from "./CommandeModele";

export interface ClientModele {
  id: number;
  roles: [];
  prenom: string;
  nom: string;
  telephone: string;
  mancheClient: string;
  epauleClient: string;
  couClient: string;
  longueurBrasClient: string;
  longueurPantalonClient: string;
  cuisseClient: string;
  hancheClient: string;
  tourDeBrasClient: string;
  tourDeTailleClient: string;
  mancheProtrineClient: string;
  ceintureClient: string;
  commande: CommandeModele;
  poignetMachetClient: string;
  BrasClient: string;
}
