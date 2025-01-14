import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:3000/payments';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getWallet(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authService.getToken());
    return this.http.get(`${this.baseUrl}/wallet`, { headers });
  }

  pay(amount: number, type: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.authService.getToken());
    return this.http.post(`${this.baseUrl}/pay`, { amount, type }, { headers });
  }

  history(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.authService.getToken());
    return this.http.get(`${this.baseUrl}/history`, { headers });
  }
}
