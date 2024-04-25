import { Component } from '@angular/core';
import { Circulation } from '../../../interfaces/circulation.interface';
import { CirculationService } from '../../../services/circulation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Review } from '../../../interfaces/review.interface';
import { ReviewService } from '../../../services/review.service';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';

@Component({
  selector: 'app-circulation',
  standalone: true,
  imports: [CommonModule,FormsModule,ReviewDialogComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  showDialog = false;
  reviews!:Review[] ;
  constructor(private reviewService: ReviewService) {}
  searchId!:string;
  ngOnInit(): void {
    this.fetchReviews();
  }

  delete(id: string) {
    console.log(id);
    this.reviewService.delete(id).subscribe()
    this.fetchReviews();
  }

  showCreateDialog() {
    this.showDialog = true;
  }

  searchById(){
    this.reviewService.getById(this.searchId).subscribe((review:Review)=>{
      this.reviews  = [review]
    })
  }

  clear(){
    this.fetchReviews();
  }

  closeDialog() {
    this.showDialog = false;
  }

  submit(value: any) {
    if (value) {
      this.showDialog = false;
    }
    this.fetchReviews();
  }

  fetchReviews() {
    this.reviewService.getAll().subscribe((data: Review[]) => {
      this.reviews = data;
    });
  }
}
