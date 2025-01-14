import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartVisible = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisible.asObservable();
  private bets: any[] = [];

  showCart() {
    if (this.bets.length !== 0) {
      this.cartVisible.next(true);
    }
  }

  hideCart() {
    this.cartVisible.next(false);
  }

  addBet(bet: any) {
    this.bets.push(bet);
  }

  getBets() {
    return this.bets;
  }
}
