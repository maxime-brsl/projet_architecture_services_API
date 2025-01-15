import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../services/bet-cart-service/bet-cart.service';
import {BetService} from '../../../services/bet-service/bet.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './bet-cart.component.html',
  imports: [
    NgIf,
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./bet-cart.component.css']
})
export class CartComponent implements OnInit {
  bets: any[] = [];
  isCombined: boolean = false;
  isVisible: boolean = false;

  constructor(private betService: BetService, private cartService: CartService) {
  }

  ngOnInit() {
    this.bets = this.cartService.getBets();
    this.cartService.cartVisible$.subscribe(visible => {
      this.isVisible = visible;
    });
  }

  toggleBetType() {
    this.isCombined = !this.isCombined;
  }

  clearBets() {
    // this.bets = [];
    console.log(this.bets)
  }

  hideCart() {
    this.cartService.hideCart();
  }

  placeBet() {
    if (this.isCombined) {
      // this.bets = {
      //   type: 'COMBINED',
      //   bets: this.bets
      // };
    }
    for (const bet of this.bets) {
      this.betService.placeBet(bet.matchId, bet.type, bet.outcome, bet.stake).subscribe({
        next: () => {
          alert('Pari placé avec succès');
        },
        error: (err: any) => {
          console.error('Erreur lors du placement du pari', err);
        }
      });
      this.clearBets();
      this.hideCart();
    }
  }
}
