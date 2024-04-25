import { Injectable } from '@angular/core';
import { Catalogue } from '../interfaces/catalogues.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acquisition } from '../interfaces/acquisition.interface';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionService {
  baseUrl = 'http://localhost:8086/acquisition'
  constructor(private http:HttpClient) { }
  
  create(catalogue:Acquisition){
    return this.http.post(`${this.baseUrl}/create-acquisition`,catalogue)
  }
  delete(id:string){
    return this.http.delete(`${this.baseUrl}/delete-acquisition/${id}`)
  }

  getById(id:string){
    return this.http.get<Acquisition>(`${this.baseUrl}/search-acquisition/${id}`)
  }

  getAll():Observable<Acquisition[]>{
    return this.http.get<Acquisition[]>(`${this.baseUrl}/view-acquisitions`)
  }
}
