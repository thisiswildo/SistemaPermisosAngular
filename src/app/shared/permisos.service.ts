import { Injectable } from '@angular/core';
import { Permisos } from './permisos.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://localhost:44396/api';
  formData: Permisos = new Permisos();

  fetchPermiso(id: number){
    return this.http.get(`${this.baseURL}/permisos/${id}`);
  }

  fetchPermisos(){
    return this.http.get(`${this.baseURL}/permisos`);
  }

  postPermiso(){
    return this.http.post(`${this.baseURL}/permisos`, this.formData);
  }

  putPermiso(id: number){
    return this.http.put(`${this.baseURL}/permisos/${id}`, this.formData);
  }

  deletePermiso(id: number){
    return this.http.delete(`${this.baseURL}/permisos/${id}`);
  }
}
