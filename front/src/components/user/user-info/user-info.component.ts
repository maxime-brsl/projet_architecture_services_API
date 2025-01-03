import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {
  user: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    this.http
      .get('http://localhost:3000/users/me', {
        headers: { Authorization: token || '' },
      })
      .subscribe((user) => {
        this.user = user;
      });
  }
}
