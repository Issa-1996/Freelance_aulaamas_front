import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ClientModele } from 'app/Modeles/ClientModele';
import { envVars } from 'envVars';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodeUsersService {
  headers = new HttpHeaders({Accept: '*/*'});
  constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService) { }

  getAllClient(): Observable<ClientModele>{
    return this.httpClient.get<ClientModele>(`${envVars.url}/aulaamas/users`);
  }
  addClient(Client: ClientModele): Observable<ClientModele> {
    return this.httpClient.post<ClientModele>(`${envVars.url}/aulaamas/users`, Client, {headers: this.headers});
  }
  getUserConnected(username: any): Observable<ClientModele>{
    return this.httpClient.get<ClientModele>(`${envVars.url}/aulaamas/users?username=${username}`);
  }
  updateClient(Client: any): Observable<any>{
    return this.httpClient.put<any>(`${envVars.url}/aulaamas/users/`+ Client.id, Client, {headers: this.headers});
  }
}
