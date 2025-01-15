import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private bets: any[] = [];
  private isCombined: boolean = false;

  setCombined(combined: boolean) {
    this.isCombined = combined;
  }

  getCombined() {
    return this.isCombined;
  }

  addBet(bet: any) {
    this.bets.push(bet);
  }

  getBets() {
    return this.bets;
  }

  clearBets() {
    this.bets = [];
  }
}
