import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../interfaces/members.interface';
import { Circulation } from '../interfaces/circulation.interface';

@Injectable({
  providedIn: 'root'
})
export class CirculationService {
  baseUrl = 'http://localhost:8086/circulation'
  constructor(private http:HttpClient) { }
  
  create(member:Circulation){
    return this.http.post(`${this.baseUrl}/create-circulation`,member)
  }
  delete(id:string){
    return this.http.delete(`${this.baseUrl}/delete-circulation/${id}`)
  }

  getById(id:string){
    return this.http.get<Circulation>(`${this.baseUrl}/search-circulation/${id}`)
  }

  getAll():Observable<Circulation[]>{
    return this.http.get<Circulation[]>(`${this.baseUrl}/view-circulations`)
  }
}
