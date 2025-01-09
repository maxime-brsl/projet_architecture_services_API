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

   addOdd(matchId: number, outcome: string, odd: number): Observable<any> {
     let headers = new HttpHeaders();
     headers = headers.set('Authorization', this.authService.getToken());
     const requestBody = {
       matchId: matchId,
       outcome: outcome,
       odd: odd
     };
     return this.http.post(`${this.baseUrl}/create`, requestBody, { headers });
  }

  getOdd(matchId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${matchId}`);
  }
}
