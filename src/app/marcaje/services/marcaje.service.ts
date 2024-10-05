import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marcaje } from '../interfaces/marcaje.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcajeService {

  /* private apiUrl = 'http://localhost:8080/marcajes' */
  private apiUrl = 'http://18.219.196.79:8080/sistema-marcaje-jwt/marcajes'


  constructor(private http : HttpClient) { }

  registrarEntrada(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/entrada/${username}`, {});
  }

  registrarSalida(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/salida/${username}`, {});
  }

  obtenerHistorial(username: string): Observable<Marcaje[]> {
    return this.http.get<Marcaje[]>(`${this.apiUrl}/historial/${username}`);
  }

  obtenerUltimoMarcaje(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ultimo/${username}`);
  }

  obtenerMarcajesPaginados(page:number, size: number):Observable<any>{
    const url = `${this.apiUrl}/paginados/`
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(url, {params})
  }
}
