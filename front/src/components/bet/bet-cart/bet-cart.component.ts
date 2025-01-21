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

  constructor(private betService: BetService, protected cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.bets$.subscribe((bets) => {
      this.bets = bets;
    });
  }

  toggleBetType() {
    this.cartService.setCombined(this.isCombined);
  }

  clearBets() {
    this.cartService.clearBets();
    this.bets = [];
  }

  placeBet() {
    if (this.isCombined) {
      //Manque de temps pour implémenter la fonctionnalité
    }
    for (const bet of this.bets) {
      this.betService.placeBet(bet.matchId, bet.type, bet.outcome, bet.stake).subscribe({
        next: () => {
          alert('Pari placé avec succès');
        },
        error: (err: any) => {
          if (err.status == '405') {
            alert('Solde insuffisant');
          }
          console.error('Erreur lors du placement du pari', err);
        }
      });
    }
    this.clearBets();
  }
}
