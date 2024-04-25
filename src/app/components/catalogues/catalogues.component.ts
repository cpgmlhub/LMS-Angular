import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Catalogue } from '../../interfaces/catalogues.interface';
import { DialogComponent } from '../catalogue-dialog/catalogue-dialog.component';
import { CatalogueService } from '../../services/catalogue.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogues',
  standalone: true,
  imports: [CommonModule, DialogComponent,FormsModule],
  templateUrl: './catalogues.component.html',
  styleUrl: './catalogues.component.css',
})
export class CataloguesComponent implements OnInit {
  showDialog = false;
  searchId!:string;
  catalogues!: Catalogue[] ;
  constructor(private catalogueService: CatalogueService) {}
  ngOnInit(): void {
    this.fetchCatalogues();
  }

  deleteCatalogue(catalogueId: string) {
    console.log(catalogueId);
    this.catalogueService.delete(catalogueId).subscribe(()=>{
      this.fetchCatalogues();
      alert("Catalogue deleted successfully");
    })
  }

  showCreateDialog() {
    this.showDialog = true;
    this.fetchCatalogues();
  }

  searchById(){
    this.catalogueService.getById(this.searchId).subscribe((catalogue:Catalogue)=>{
      this.catalogues  = [catalogue]
    })
  }

  clear(){
    this.fetchCatalogues();
  }

  closeDialog() {
    this.showDialog = false;
  }

  submit(value: any) {
    if (value) {
      this.showDialog = false;
      this.fetchCatalogues();
    }
  }
  fetchCatalogues() {
    this.catalogueService.getAll().subscribe((data: Catalogue[]) => {
      this.catalogues = data;
    });
  }
}
