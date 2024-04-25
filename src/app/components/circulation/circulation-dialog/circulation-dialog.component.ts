import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CatalogueService } from '../../../services/catalogue.service';
import { CirculationService } from '../../../services/circulation.service';
import { MemberService } from '../../../services/members.service';
import { Member } from '../../../interfaces/members.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-circulation-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './circulation-dialog.component.html',
  styleUrl: './circulation-dialog.component.css'
})
export class CirculationDialogComponent {

  constructor( private circulation:CirculationService,private memberService:MemberService){
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
     issueDate: new FormControl('',[Validators.required]),
     dueDate: new FormControl('',[Validators.required]),
  })
  }

  submit(){
    this.onSubmit.emit(true);
    console.log(this.createForm.value);
    if(this.createForm.valid){
      this.circulation.create(this.createForm.value).subscribe(()=>{
        this.onSubmit.emit(true);
      })
    }
  }

  close(){
    this.onCancel.emit(true);
  }
}
