import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OddsService {
  private baseUrl = 'http://localhost:3000/odds';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

   addOdd(matchId: number, outcome: string): Observable<any> {
    //TODO Ajouter la cote pour le match
    //afficher une popup pour saisir la cote et la valider
    //faire appel au service Odd pour enregistrer la cote
     let headers = new HttpHeaders();
     headers = headers.set('Authorization', this.authService.getToken());
     const requestBody = {
       matchId,
       odds: {
         [outcome]: 3.21
       }
     };
     return this.http.post(`${this.baseUrl}/create`, requestBody, { headers });
  }
}
