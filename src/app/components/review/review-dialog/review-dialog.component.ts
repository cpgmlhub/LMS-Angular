import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CatalogueService } from '../../../services/catalogue.service';
import { CirculationService } from '../../../services/circulation.service';
import { MemberService } from '../../../services/members.service';
import { Member } from '../../../interfaces/members.interface';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css'
})
export class ReviewDialogComponent {

  constructor( private reviewService:ReviewService,private memberService:MemberService){
  }

  createForm!:FormGroup;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  members!:Member[];

  membersOption!:{label:string,value:string}[];

  ngOnInit(): void {

  this.memberService.getAll().subscribe((members)=>{
    this.members = members
    this.membersOption = members.map((member)=>{
      return {
        label: member.name,
        value:member.id
      }
    })
  })  
  this.createForm = new FormGroup({
     memberId: new FormControl('',[Validators.required]),
     rating: new FormControl(0,[Validators.required]),
     itemId: new FormControl('',[Validators.required]),
  })
  }

  submit(){
    if(this.createForm.valid){
      this.reviewService.create(this.createForm.value).subscribe(()=>{
        this.onSubmit.emit(true);
      })
    }
  }

  close(){
    this.onCancel.emit(true);
  }
}
