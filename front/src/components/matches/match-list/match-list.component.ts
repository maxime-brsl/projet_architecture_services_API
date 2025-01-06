import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

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

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.competitionId = this.route.snapshot.paramMap.get('competitionId');
    if (this.competitionId) {
      this.loadMatches(this.competitionId);
    }
  }

  loadMatches(competitionId: string) {
    this.http
      .get(`http://localhost:3000/matches/${competitionId}`)
      .subscribe({
        next: (response: any) => {
          this.matches = response;
          console.log(this.matches[10])
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des matches', err);
        },
      });
  }

  isFuturMatch(match: any): boolean {
    const now = new Date();
    const matchDate = new Date(match.utcDate);
    return matchDate > now;
  }

}
