import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth-service/auth.service';
import {FormsModule} from '@angular/forms';

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
    private router: Router
  ) {}

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (response: { token: string; role: string; }) => {
          this.authService.setToken(response.token);
          this.authService.setRole(response.role);
          this.router.navigate(['/competitions']).then();
        },
        error: (err: any) => {
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
