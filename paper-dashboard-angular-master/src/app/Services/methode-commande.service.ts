import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CommandeModele } from 'app/Modeles/CommandeModele';
import { envVars } from 'envVars';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodeCommandeService {

  headers = new HttpHeaders({Accept: '*/*'});
  constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService) { }

  getAllCommandes(): Observable<CommandeModele>{
    return this.httpClient.get<CommandeModele>(`${envVars.url}/aulaamas/commandes`);
  }
  addCommande(Commande: CommandeModele): Observable<CommandeModele> {
    return this.httpClient.post<CommandeModele>(`${envVars.url}/aulaamas/commandes`, Commande, {headers: this.headers});
  }
  updateCommande(Commande: CommandeModele): Observable<CommandeModele>{
    return this.httpClient.put<CommandeModele>(`${envVars.url}/aulaamas/commandes/`+ Commande.id, Commande, {headers: this.headers});
  }
}
