import { Component, OnInit } from '@angular/core';
import { User } from '../domains/User';
import { UserService } from '../services/user.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.css'],
  providers: [MessageService,ConfirmationService]

})
export class UserMgmtComponent implements OnInit {
  selectedUser: User = null;

  userDialog: boolean;

  users: User[];

  user: User;

  selectedCities: User[];

  submitted: boolean;

  genders: any[];
  roles: any[];
  constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) {​​ }​​

  ngOnInit() {
    this.genders = [
      {label: 'Male', value: 'Male'},
      {label: 'Female', value: 'Female'}
  ];
  this.roles = [
    {label: 'Admin', value: 'Admin'},
    {label: 'Traveler', value: 'Traveler'},
    {label: 'Driver', value: 'Driver'}
];
    this.userService.getAllUsers().then(data => {
      this.users = data;
    });
  }
  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
}

deleteSelectedUsers() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected users?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter(val => !this.selectedCities.includes(val));
            this.selectedCities = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Users Deleted', life: 3000});
        }
    });
}

editUser(user: User) {
    this.user = {...user};
    this.userDialog = true;
}

deleteUser(user: User) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + user.ID + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter(val => val.ID !== user.ID);
            this.user = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
        }
    });
}

hideDialog() {
    this.userDialog = false;
    this.submitted = false;
}

saveUser() {
    this.submitted = true;

    if (this.user.first_name.trim()) {
        if (this.user.ID) {
            this.users[this.findIndexById(this.user.ID)] = this.user;
            this.userService.updateUser(this.user);             
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
        }
        else {
            this.user.ID = this.createId();
            var credit:number = this.user.credit;
            this.user.credit = credit;
            this.users.push(this.user);
            debugger;
            console.log("user data ", this.user);
            this.userService.addUser(this.user);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});
        }

        this.users = [...this.users];
        this.userDialog = false;
        this.user = {};
    }
}

findIndexById(id:number): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].ID === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): number {
  let max = 0;
  for ( var i = 0; i < this.users.length; i++ ) {
     if(this.users[i].ID > max)
     {
       max = this.users[i].ID;
     }
  }
  return max+1;
}
​​




}
