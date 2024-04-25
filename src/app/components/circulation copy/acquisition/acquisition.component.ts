import { Component } from '@angular/core';
import { Circulation } from '../../../interfaces/circulation.interface';
import { CirculationService } from '../../../services/circulation.service';
import { CommonModule } from '@angular/common';
import { AcquisitionDialogComponent } from '../acquisition-dialog/acquisition-dialog.component';
import { Acquisition } from '../../../interfaces/acquisition.interface';
import { AcquisitionService } from '../../../services/acquisition.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acquisition',
  standalone: true,
  imports: [CommonModule,AcquisitionDialogComponent,FormsModule],
  templateUrl: './acquisition.component.html',
  styleUrl: './acquisition.component.css'
})
export class AcquisitionComponent {
  showDialog = false;
  acquisitions!:Acquisition[] ;
  constructor(private acquisitionService: AcquisitionService) {}
  searchId!:string;
  ngOnInit(): void {
    this.fetchAcquisition();
  }

  delete(id: string) {
    console.log(id);
    this.acquisitionService.delete(id).subscribe(()=>{
      this.fetchAcquisition();
      alert("Acquisition deleted successfully");
    })
  }

  showCreateDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  searchById(){
    this.acquisitionService.getById(this.searchId).subscribe((acquisition:Acquisition)=>{
      this.acquisitions  = [acquisition]
    })
  }

  clear(){
    this.fetchAcquisition();
  }

  submit(value: any) {
    if (value) {
      this.showDialog = false;
    }
    this.fetchAcquisition();
  }

  fetchAcquisition() {
    this.acquisitionService.getAll().subscribe((data: Acquisition[]) => {
      this.acquisitions = data;
    });
  }
}
