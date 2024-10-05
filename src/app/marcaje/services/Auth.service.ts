import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /* private apiUrl = 'http://18.219.196.79:8080/api/auth'; */
  private apiUrl = 'http://18.219.196.79:8080/sistema-marcaje-jwt/api/auth';
  private token: string | null = null;

  constructor(private http: HttpClient) { }
  private isAuthenticated = false;

  login(username: string, password: string):Observable<any>{
    const url = `${this.apiUrl}/login`;

    return this.http.post<any>(url,{username, password}).pipe(
      tap((response: any) => {
        const token = response.accessToken;
        if (token){
          localStorage.setItem('token', token);
          this.isAuthenticated = true
        }
      })
    );
  }



  getToken(): string | null {
    return localStorage.getItem('token');
    
  }

 


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isAuthenticated = false;
  }

  isUserAuthenticated():boolean{
    /* return this.getToken() !== null; */
    return this.isAuthenticated;
  }

  public addUser(user: User): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<User>(`${url}`, user).pipe(
      catchError(error => {
        console.error('Error en la petición:', error);
        return throwError(error);
      })
    );
  }
  
  getRole(): string {
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado en localStorage
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.role; // Asume que el token tiene un campo "role"
    }
    return '';
  }

}
