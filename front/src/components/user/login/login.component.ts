import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user-service/user.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    HttpClientModule
  ]
})
export class LoginComponent {
  username: string = ''; // Stocke le nom d'utilisateur entré
  password: string = ''; // Stocke le mot de passe entré
  errorMessage: string = ''; // Message d'erreur à afficher en cas d'échec
  isLoading: boolean = false; // Indicateur pour savoir si la connexion est en cours

  constructor(private userService: UserService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = ''; // Réinitialise le message d'erreur
    this.isLoading = true; // On commence le chargement, donc on désactive le bouton

    if (!this.username || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      this.isLoading = false; // On arrête le chargement si les champs sont vides
      return;
    }

    // Appel au service pour effectuer la connexion
    this.userService.login(this.username, this.password).subscribe(
      (response: { token: string }) => {
        // Stocke le token JWT dans le localStorage
        localStorage.setItem('token', response.token);

        // Redirige l'utilisateur vers une autre page (ex. : page des informations utilisateur)
        this.router.navigate(['/me']);
      },
      (error: { error: { message: string } }) => {
        // Gère les erreurs et affiche un message à l'utilisateur
        console.error(error);
        this.errorMessage =
          error.error?.message || 'Une erreur est survenue. Veuillez réessayer.';
      },
      () => {
        this.isLoading = false; // On arrête le chargement une fois la requête terminée
      }
    );
  }
}
