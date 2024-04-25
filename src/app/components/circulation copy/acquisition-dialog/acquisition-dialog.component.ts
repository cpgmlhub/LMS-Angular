import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CirculationService } from '../../../services/circulation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-circulation-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './acquisition-dialog.component.html',
})
export class AcquisitionDialogComponent {

  constructor( private acquisitionService:CirculationService,){
  }

  createForm!:FormGroup;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();



  ngOnInit(): void {

  this.createForm = new FormGroup({
     note: new FormControl('',[Validators.required]),
     acquisitionDate: new FormControl('',[Validators.required]),
     source: new FormControl('',[Validators.required]),
  })
  }

  submit(){
    if(this.createForm.valid){
      this.acquisitionService.create(this.createForm.value).subscribe(()=>{
        this.onSubmit.emit(true);
      })
    }
  }

  close(){
    this.onCancel.emit(true);
  }
}
