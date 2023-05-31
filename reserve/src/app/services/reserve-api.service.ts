import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, map } from 'rxjs';
import { Quadra } from '../models/quadra.model';
import { ResponseModel } from '../models/response.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ReserveApiService {

  readonly reserveApiUrl = "https://localhost:7188/api";

  constructor(private http:HttpClient) { }

  //Usuario
  getUsuariosList():Observable<any[]>{
    return this.http.get<any>(this.reserveApiUrl + '/usuarios');
  }

  postUsuario(data:Usuario){
    return this.http.post(this.reserveApiUrl + '/usuarios', data);
  }

  updateUsuario(id:number|string, data:any){
    return this.http.put(this.reserveApiUrl + `/usuarios/${id}`, data);
  }

  deleteUsuario(id:number|string){
    return this.http.delete(this.reserveApiUrl + `/usuarios/${id}`);
  }

  getUsuarioByLogin(email:string, senha:string){
    return this.http.get<any>(this.reserveApiUrl + `/usuarios/${email}/${senha}`);
  }

  //Quadra
  getQuadrasList(): Observable<any[]>{
    return this.http.get<any>(this.reserveApiUrl + '/quadras');
  }

  postQuadra(data:any){
    return this.http.post(this.reserveApiUrl + '/quadras', data);
  }

  updateQuadra(id:number|string, data:any){
    return this.http.put(this.reserveApiUrl + `/quadras/${id}`, data);
  }

  deleteQuadra(id:number|string){
    return this.http.delete(this.reserveApiUrl + `/quadras/${id}`);
  }

  //Reserva
  getReservasList():Observable<any[]>{
    return this.http.get<any>(this.reserveApiUrl + '/reservas');
  }

  postReserva(data:any){
    return this.http.post(this.reserveApiUrl + '/reservas', data);
  }

  updateReserva(id:number|string, data:any){
    return this.http.put(this.reserveApiUrl + `/reservas/${id}`, data);
  }

  deleteReserva(id:number|string){
    return this.http.delete(this.reserveApiUrl + `/reservas/${id}`);
  }

  // Quadras Imagens
  getImagensListById(id:number|string): Observable<any[]>{
    return this.http.get<any>(this.reserveApiUrl + `/imagems/${id}`);
  }

}
