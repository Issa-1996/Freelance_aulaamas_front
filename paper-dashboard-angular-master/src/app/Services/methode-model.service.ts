import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelModele } from 'app/Modeles/ModelModele';
import { envVars } from 'envVars';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodeModelService {

  headers = new HttpHeaders({Accept: '*/*'});
  constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService) { }

  getAllModels(): Observable<ModelModele>{
    return this.httpClient.get<ModelModele>(`${envVars.url}/aulaamas/models`);
  }
  addModel(Model: ModelModele): Observable<ModelModele> {
    return this.httpClient.post<ModelModele>(`${envVars.url}/aulaamas/models`, Model, {headers: this.headers});
  }
  updateModel(Model: any): Observable<any>{
    return this.httpClient.put<any>(`${envVars.url}/aulaamas/models/`+ Model.id, Model, {headers: this.headers});
  }
}
