import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DepenseModele } from 'app/Modeles/DepenseModele';
import { envVars } from 'envVars';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodeDepenseService {

  headers = new HttpHeaders({Accept: '*/*'});
  constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService) { }

  getAllDepenses(): Observable<DepenseModele>{
    return this.httpClient.get<DepenseModele>(`${envVars.url}/aulaamas/depenses`);
  }
  addDepense(Depense: DepenseModele): Observable<DepenseModele> {
    return this.httpClient.post<DepenseModele>(`${envVars.url}/aulaamas/depenses`, Depense, {headers: this.headers});
  }
}
