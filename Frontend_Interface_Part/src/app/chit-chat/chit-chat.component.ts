import { Component, OnInit } from '@angular/core';
import { Chitchat } from '../domains/Chitchat';
import { ChitchatService } from '../services/chitchat.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chit-chat',
  templateUrl: './chit-chat.component.html',
  styleUrls: ['./chit-chat.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ChitChatComponent implements OnInit {
  chitchatDialog: boolean;

  chitchats: Chitchat[];

  chitchat: Chitchat;

  selectedChitchats: Chitchat[];

  submitted: boolean;

  statuses: any[];


  selectedChitchat: Chitchat = null;
  constructor(private chitchatService: ChitchatService, private messageService: MessageService, private confirmationService: ConfirmationService) {​​ }​​

  ngOnInit() {
    this.chitchatService.getAllChitchat().then(data => this.chitchats = data);
  }

openNew() {
    this.chitchatDialog = true;
    this.chitchat = {};
    this.submitted = false;

}

editChitchat(chitchat: Chitchat) {
  this.chitchat = {...chitchat};
  this.chitchatDialog = true;
}
deleteChitchat(chitchat: Chitchat) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + chitchat.ID + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.chitchats = this.chitchats.filter(val => val.ID !== chitchat.ID);
          this.chitchat = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Chitchat Deleted', life: 3000});
      }
  });
}
hideDialog() {
  this.chitchatDialog = false;
  this.submitted = false;
}
saveChitchat() {
  this.submitted = true;
  if (this.chitchat.description.trim()) {
      if (this.chitchat.ID) {
          this.chitchatService.updateChitchat(this.chitchat);
          this.chitchats[this.findIndexById(this.chitchat.ID)] = this.chitchat;                
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Chitchat Updated', life: 3000});
      }
      else {
          this.chitchat.ID = this.createId();
          this.chitchatService.addChitchat(this.chitchat);
          this.chitchats.push(this.chitchat);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Chitchat Created', life: 3000});
      }

      this.chitchats = [...this.chitchats];
      this.chitchatDialog = false;
      this.chitchat = null;
  }
}
findIndexById(id:number): number {
  let index = -1;
  for (let i = 0; i < this.chitchats.length; i++) {
      if (this.chitchats[i].ID === id) {
          index = i;
          break;
      }
  }

  return index;
}
createId(): number {
  let max = 0;
  for ( var i = 0; i < this.chitchats.length; i++ ) {
     if(this.chitchats[i].ID > max)
     {
       max = this.chitchats[i].ID;
     }
  }
  return max+1;
}
}
