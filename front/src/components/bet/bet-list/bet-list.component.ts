import {Component, OnInit} from '@angular/core';
import {BetService} from '../../../services/bet-service/bet.service';
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {MatchService} from '../../../services/match-service/match.service';

@Component({
  selector: 'app-bet',
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './bet-list.component.html',
  styleUrl: './bet-list.component.css'
})
export class BetListComponent implements OnInit {
  bets: any[] = [];

  constructor(private betService: BetService, private matchService : MatchService) {}

  ngOnInit() {
    this.betService.getBets().subscribe({
      next: (response: any) => {
        this.bets = response;
        for (const bet of this.bets) {
          this.matchService.getMatch(bet.matchId).subscribe({
            next: (response: any) => {
              bet.match = response
            },
            error: (err: any) => {
              console.error('Erreur lors de la récupération du match', err);
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des paris', err);
      }
    });
  }
}
