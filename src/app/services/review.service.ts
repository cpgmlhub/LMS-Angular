import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl = 'http://localhost:8086/review'
  constructor(private http:HttpClient) { }
  
  create(review:Review){
    return this.http.post(`${this.baseUrl}/create-review`,review)
  }
  delete(id:string){
    return this.http.delete(`${this.baseUrl}/delete-review/${id}`)
  }

  getById(id:string){
    return this.http.get<Review>(`${this.baseUrl}/search-review/${id}`)
  }

  getAll():Observable<Review[]>{
    return this.http.get<Review[]>(`${this.baseUrl}/view-reviews`)
  }
}
