import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private role: string | null = null;

  constructor(private http: HttpClient) { }

  // Stocke le token dans le service et le localStorage
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  // Récupère le token stocké, ou bien dans le service ou dans le localStorage
  getToken(): string  {
    if (!this.token) {
      this.token = localStorage.getItem('authToken');
    }
    return this.token?.toString() || '';
  }

  setRole(role: string): void {
    this.role = role;
    localStorage.setItem('authRole', role);
  }

  getRole(): string | null {
    if (!this.role) {
      this.role = localStorage.getItem('authRole');
    }
    return this.role?.toString() || '';
  }

  // Vérifie si l'utilisateur est authentifié (si un token est présent)
  isAuthenticated(): boolean {
    return !!this.getToken(); // Renvoie true si un token est présent
  }

  // Supprime le token pour déconnecter l'utilisateur
  logout(): void {
    this.token = null;
    this.role = null;
    localStorage.removeItem('authToken');
  }

  login(username: string, password: string): any {
    return this.http.post(`http://localhost:3000/users/login`, { username, password });
  }
}
