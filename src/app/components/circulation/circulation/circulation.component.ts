import { Component } from '@angular/core';
import { Circulation } from '../../../interfaces/circulation.interface';
import { CirculationService } from '../../../services/circulation.service';
import { CommonModule } from '@angular/common';
import { CirculationDialogComponent } from '../circulation-dialog/circulation-dialog.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-circulation',
  standalone: true,
  imports: [CommonModule,CirculationDialogComponent,FormsModule],
  templateUrl: './circulation.component.html',
  styleUrl: './circulation.component.css'
})
export class CirculationComponent {
  showDialog = false;
  circulations!:Circulation[] ;
  constructor(private circulationService: CirculationService) {}
  searchId!:string;
  ngOnInit(): void {
    this.fetchCirculations();
  }

  delete(id: string) {
    console.log(id);
    this.circulationService.delete(id).subscribe(()=>{
      this.fetchCirculations();
      alert("Circulation deleted successfully");
    })
  }

  showCreateDialog() {
    this.showDialog = true;
  }

  searchById(){
    this.circulationService.getById(this.searchId).subscribe((circulation:Circulation)=>{
      this.circulations  = [circulation]
    })
  }

  clear(){
    this.fetchCirculations();
  }

  closeDialog() {
    this.showDialog = false;
  }

  submit(value: any) {
    if (value) {
      this.showDialog = false;
    }
    this.fetchCirculations();
  }

  fetchCirculations() {
    this.circulationService.getAll().subscribe((data: Circulation[]) => {
      this.circulations = data;
    });
  }
}
