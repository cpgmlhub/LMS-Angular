import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../../services/catalogue.service';
import { Member } from '../../interfaces/members.interface';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';
import { MemberService } from '../../services/members.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, MemberDialogComponent,FormsModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class membersComponent implements OnInit {
  showDialog = false;
  searchId!:string;
  members!:Member[];
  constructor(private memberService:MemberService) {}
  ngOnInit(): void {
    this.fetchMembers();
  }

  deleteMember(id: string) {
    console.log(id);
    this.memberService.delete(id).subscribe(()=>{
      this.fetchMembers();
      alert("Member deleted successfully");
    })
  }

  searchById(){
    this.memberService.getById(this.searchId).subscribe((member:Member)=>{
      this.members  = [member]
    })
  }

  clear(){
    this.fetchMembers();
  }

  showCreateDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  submit(value: any) {
    if (value) {
      this.showDialog = false;
      this.fetchMembers();
    }
  }
  fetchMembers() {
    this.memberService.getAll().subscribe((data: Member[]) => {
      this.members = data;
    });
  }
}
