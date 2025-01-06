import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competition-selector',
  templateUrl: './competition-selector.component.html',
  styleUrls: ['./competition-selector.component.css'],
})
export class CompetitionSelectorComponent {
  constructor(private router: Router) {}

  navigateTo(competitionId: string) {
    this.router.navigate(['/matches', competitionId]).then();
  }
}
