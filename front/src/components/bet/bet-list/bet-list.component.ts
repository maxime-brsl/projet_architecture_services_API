import {Component, OnInit} from '@angular/core';
import {BetService} from '../../../services/bet-service/bet.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-bet',
  imports: [
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './bet-list.component.html',
  styleUrl: './bet-list.component.css'
})
export class BetListComponent implements OnInit {
  bets: any[] = [];

  constructor(private betService: BetService) {}

  ngOnInit() {
    this.betService.getBets().subscribe({
      next: (response: any) => {
        this.bets = response;
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des paris', err);
      }
    });
  }
}
