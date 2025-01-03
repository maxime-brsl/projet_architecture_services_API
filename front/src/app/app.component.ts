import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'The Real Deal';

  constructor(private authService: AuthService, private router: Router) {}

  // Vérifie si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige vers la page de connexion après déconnexion
  }

  ngOnInit(): void {}
}
