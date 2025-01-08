import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:3000/payments';

  constructor(private http: HttpClient) {}

  getWallet(token: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.get(`${this.baseUrl}/wallet`, { headers });
  }

  pay(token: string, amount: number, type: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(`${this.baseUrl}/pay`, { amount, type }, { headers });
  }
}
