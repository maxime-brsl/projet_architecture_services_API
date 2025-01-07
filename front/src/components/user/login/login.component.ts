import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth-service/auth.service';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../../services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule
  ]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  login(): void {
    this.http
      .post<{ token: string, role: string }>('http://localhost:3000/users/login', {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.authService.setRole(response.role);
          alert('Connexion réussie');
        },
        error: (err) => {
          if (err.status === 400) {
            alert('Identifiants incorrects');
            return;
          } else {
            console.error('Erreur de connexion', err);
            alert('Échec de la connexion');
          }
        },
      });
  }
}
