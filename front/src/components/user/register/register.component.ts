import {Component} from '@angular/core';
import {UserService} from '../../../services/user-service/user.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    FormsModule
  ]
})
export class RegisterComponent {
  username = '';
  password = '';
  role = '';

  constructor(private userService: UserService) {
  }

  onRegister() {
    this.userService.register(this.username, this.password, this.role).subscribe(
      () => {
        alert('Utilisateur créé avec succès !');
      },
      (error: any) => {
        console.error(error);
        alert('Erreur lors de la création de l’utilisateur.');
      }
    );
  }
}
