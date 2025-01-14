import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private baseUrl = 'http://localhost:3000/matches';

  constructor(private http: HttpClient) { }

  loadMatches(competitionId: string) {
    return this.http.get(`${this.baseUrl}/${competitionId}`);
  }

  getMatch(matchId: number) {
    return this.http.get(`${this.baseUrl}/match/${matchId}`);
  }
}
