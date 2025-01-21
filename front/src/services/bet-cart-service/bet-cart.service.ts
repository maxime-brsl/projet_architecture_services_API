import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private betsSubject = new BehaviorSubject<any[]>([]);
  bets$ = this.betsSubject.asObservable();
  private isCombined: boolean = false;

  setCombined(combined: boolean) {
    this.isCombined = combined;
  }

  getCombined() {
    return this.isCombined;
  }

  addBet(bet: any) {
    const currentBets = this.betsSubject.value;
    this.betsSubject.next([...currentBets, bet]);
  }

  getBets() {
    return this.betsSubject.value;
  }

  clearBets() {
    this.betsSubject.next([]);
  }
}
