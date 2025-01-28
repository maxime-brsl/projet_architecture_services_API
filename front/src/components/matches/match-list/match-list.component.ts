import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {OddsService} from '../../../services/odds-service/odds.service';
import {AuthService} from '../../../services/auth-service/auth.service';
import {dialogText} from '../../../util/popupTextInput';
import {MatchService} from '../../../services/match-service/match.service';
import {CartService} from '../../../services/bet-cart-service/bet-cart.service';
import {CartComponent} from '../../bet/bet-cart/bet-cart.component';
import {firstValueFrom} from 'rxjs';
import {Bet} from '../../../models/Bet';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css'],
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    NgOptimizedImage,
    CartComponent
  ]
})
export class MatchListComponent implements OnInit {
  competitionId: string | null = null;
  matches: any[] = [];
  paginatedMatches: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private oddService: OddsService,
              private matchService: MatchService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.competitionId = this.route.snapshot.paramMap.get('competitionId');
    if (this.competitionId) {
      this.matchService.loadMatches(this.competitionId).subscribe({
        next: (response: any) => {
          this.matches = response.filter((match: any) => match.status === "TIMED");
          for (const match of this.matches) {
            this.oddService.getOdd(match.id).subscribe({
              next: (response) => {
                match.odds = response.odds;
              },
              error: (err) => {
                if (err.status === 404) {
                  console.error("Aucune cote pour ce match");
                } else {
                  console.error('Erreur lors de la récupération des cotes', err);
                }
              }
            });
          }
          this.updatePaginatedMatches();
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des matches', err);
        }
      });
    }
  }

  updatePaginatedMatches() {
    const startItem = (this.currentPage - 1) * this.itemsPerPage;
    const endItem = startItem + this.itemsPerPage;
    this.paginatedMatches = this.matches.slice(startItem, endItem);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.matches.length) {
      this.currentPage++;
      this.updatePaginatedMatches();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedMatches();
    }
  }

  async handleOddsClick(matchId: number, outcome: string): Promise<void> {
    if (this.authService.getRole()?.toLowerCase() === 'bookmaker') {
      dialogText('Ajouter une cote', 'Saisir une cote').then((odd) => {
        if (odd == null) {
          return;
        }
        if (Number(odd) <= 1) {
          alert('La cote doit être supérieure à 1');
          return;
        }
        this.oddService.addOdd(matchId, outcome, odd).subscribe({
          next: (response) => {
            const matchIndex = this.matches.findIndex((match) => match.id === matchId);
            if (matchIndex !== -1) {
              this.matches[matchIndex].odds = response.odds;
            }
          },
          error: (err) => {
            alert('Erreur lors de l\'ajout de la cote');
            console.error('Erreur lors de l\'ajout de la cote', err);
          }
        });
      });
    } else if (this.authService.getRole()?.toLowerCase() === 'parieur') {
      try {
        const oddsResponse = await firstValueFrom(this.oddService.getOdd(matchId));
        if (oddsResponse.odds['awayTeam'] > 1 && oddsResponse.odds['draw'] > 1 && oddsResponse.odds['homeTeam'] > 1) {
          dialogText('Ajouter une mise', 'Saisir une mise').then((stake) => {
            if (stake == null) {
              return;
            }
            if (Number(stake) < 0.1) {
              alert('Le paris doit être supérieur à 0.10 €');
              return;
            }
            const match = this.matches.find((match) => match.id === matchId);
            const bet : Bet = {
              matchId,
              outcome : outcome,
              awayTeam: match.awayTeam.name,
              homeTeam: match.homeTeam.name,
              type: 'simple',
              stake: Number(stake),
              odd: oddsResponse.odds[outcome]
            };
            this.cartService.addBet(bet);
          });
        } else {
          alert('Les côtes n\'ont pas encore été totalement définies pour ce match');
        }
      } catch (err: any) {
          console.error('Erreur lors de la récupération des cotes', err);
      }
    }
  }
}
