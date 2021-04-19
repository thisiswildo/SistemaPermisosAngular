import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoPermisoService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://localhost:44396/api';

  fetchTipoPermisos(){
    return this.http.get(`${this.baseURL}/tipos-permisos`);
  }
}
