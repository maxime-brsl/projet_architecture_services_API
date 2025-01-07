import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {OddsService} from '../../../services/odds-service/odds.service';
import {AuthService} from '../../../services/auth-service/auth.service';

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

  constructor(private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private oddService: OddsService) {
  }

  ngOnInit() {
    this.competitionId = this.route.snapshot.paramMap.get('competitionId');
    if (this.competitionId) {
      this.loadMatches(this.competitionId);
      //TODO CHARGER LES COTES
    }
  }

  loadMatches(competitionId: string) {
    this.http
      .get(`http://localhost:3000/matches/${competitionId}`)
      .subscribe({
        next: (response: any) => {
          this.matches = response;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des matches', err);
        },
      });
  }

  handleOddsClick(matchId: number, outcome: string, haveOdd: boolean): void {
    if (this.authService.getRole()?.toLowerCase() === 'bookmaker' && !haveOdd) {
      // Ajouter une cote via le service
      this.oddService.addOdd(matchId, outcome).subscribe({
        next: (response) => {
          console.log('Cote ajoutée avec succès', response);

          // Mettre à jour localement les données du match
          const matchIndex = this.matches.findIndex((match) => match.id === matchId);
          if (matchIndex !== -1) {
            this.matches[matchIndex].odds = response.odds; // Mise à jour avec les nouvelles cotes
          }
        },
        error: (err) => {
          console.error('Erreur lors de l’ajout de la cote', err);
        },
      });
    } else {
      console.log('Action pour parieur non encore implémentée');
    }
  }
}
