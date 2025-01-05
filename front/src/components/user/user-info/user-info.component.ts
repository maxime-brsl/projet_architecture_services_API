import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth-service/auth.service';
import {NgIf} from '@angular/common';
import {UserService} from '../../../services/user-service/user.service';

@Component({
  selector: 'app-user-info',
  imports: [
    NgIf
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    this.userService.me(token).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l’utilisateur', err);
      }
    });
  }
}
