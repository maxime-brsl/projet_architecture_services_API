import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  // Stocke le token dans le service et le localStorage
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  // Récupère le token stocké, ou bien dans le service ou dans le localStorage
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('authToken');
    }
    return this.token;
  }

  // Renvoie les en-têtes d'autorisation pour les requêtes HTTP
  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': this.getToken() || '',
    });
  }

  // Vérifie si l'utilisateur est authentifié (si un token est présent)
  isAuthenticated(): boolean {
    return !!this.getToken(); // Renvoie true si un token est présent
  }

  // Supprime le token pour déconnecter l'utilisateur
  logout(): void {
    this.token = null;
    localStorage.removeItem('authToken');
  }
}
