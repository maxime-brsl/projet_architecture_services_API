import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import {NgIf} from '@angular/common';
import {BetService} from '../services/bet-service/bet.service';
import {MatchService} from '../services/match-service/match.service';
import {timeout} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf,
    RouterLinkActive
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'The Real Deal';

  constructor(private authService: AuthService, private router: Router, private betService: BetService,
              private matchService: MatchService) {}

  // Vérifie si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  updateBet(): void {
    if (!this.isAuthenticated()) {
      return;
    }
    this.betService.checkBets().subscribe({
      next: () => {
        console.log('Résultat du pari mis à jour');
      },
      error: (err: any) => {
        console.error('Erreur lors de la mise à jour du pari', err);
      }
    });
  }

  ngOnInit(): void {
    this.updateBet();
  }
}
