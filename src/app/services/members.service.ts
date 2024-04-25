import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../interfaces/members.interface';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = 'http://localhost:8086/members'
  constructor(private http:HttpClient) { }
  
  create(member:Member){
    return this.http.post(`${this.baseUrl}/create-member`,member)
  }
  delete(id:string){
    return this.http.delete(`${this.baseUrl}/delete-member/${id}`)
  }

  getById(id:string){
    return this.http.get<Member>(`${this.baseUrl}/search-member/${id}`)
  }

  getAll():Observable<Member[]>{
    return this.http.get<Member[]>(`${this.baseUrl}/view-members`)
  }
}
