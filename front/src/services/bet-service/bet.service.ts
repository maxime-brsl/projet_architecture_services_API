import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private baseUrl = 'http://localhost:3000/bets';

  constructor(private http: HttpClient, private authService: AuthService) { }

  placeBet(matchId: number, type : string, outcome: string, stake: number): any {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authService.getToken());
    const bet = {
      matchId: matchId,
      type: type,
      outcome: outcome,
      stake: stake
    };
    return this.http.post(`${this.baseUrl}/place`, bet, { headers });
  }

  getBets(): any {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authService.getToken());
    return this.http.get(`${this.baseUrl}/my-bets`, { headers });
  }
}
