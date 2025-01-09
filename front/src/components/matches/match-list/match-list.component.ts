import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {OddsService} from '../../../services/odds-service/odds.service';
import {AuthService} from '../../../services/auth-service/auth.service';
import {dialogText} from '../../../util/popupTextInput';
import {MatchService} from '../../../services/match-service/match.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css'],
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    NgOptimizedImage
  ]
})
export class MatchListComponent implements OnInit {
  competitionId: string | null = null;
  matches: any[] = [];

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private oddService: OddsService,
              private matchService: MatchService) {
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
                console.error('Erreur lors de la récupération des cotes', err);
              }
            });
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des matches', err);
        }
      });
    }
  }

  handleOddsClick(matchId: number, outcome: string): void {
    if (this.authService.getRole()?.toLowerCase() === 'bookmaker') {
      dialogText('Ajouter une cote', 'Veuillez saisir la cote à ajouter').then((odd) => {
        if (odd == null) {
          return;
        }
        if (Number(odd) <= 1) {
          alert('La cote doit être supérieure à 1');
          return;
        }
        if (Number(odd) >= 100) {
          alert('La cote doit être inférieure à 100');
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
            console.error('Erreur lors de l\'ajout de la cote', err);
          }
        });
      });
    } else {

    }
  }
}
