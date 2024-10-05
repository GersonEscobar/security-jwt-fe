import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    /* apiUrl = 'http://localhost:8080/usuarios' */
    apiUrl = 'http://18.219.196.79:8080/sistema-marcaje-jwt/usuarios'


  constructor(private http: HttpClient) { }

  public addUser(user: User): Observable<any>{
    const url = `${this.apiUrl}/`
    return this.http.post<User>(`${url}`, user);
  }

  obtenerUsuariosPaginados(page: number, size: number): Observable<any> {
    const url = `${this.apiUrl}/paginados/`
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(url, { params });
  }

  obtenerUsuario(username: string): Observable<User>{
    const url = `${this.apiUrl}/${username}`;
    return this.http.get<User>(url);
  }

  obtenerUsuarioPorId(usuarioId: number):Observable<User>{
    const url = `${this.apiUrl}/id/${usuarioId}`;
    return this.http.get<User>(url);
  }

  eliminarUsuario(userId: number):Observable<User>{
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<User>(url);
  }

  eliminarUsuarioPorUsername(username: string): Observable<void> {
    const url = `${this.apiUrl}/username/${username}`;
    return this.http.delete<void>(url);
}


  actualizarUsuario(usuarioId: number, user: User):Observable<User>{
    const url = `${this.apiUrl}/${usuarioId}`;
    return this.http.put<User>(url,user);
  }
}