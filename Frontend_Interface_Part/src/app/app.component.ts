import { Component, OnInit } from '@angular/core';
import { User } from './domains/User';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from './services/localStorageService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  allUsers:User[] = [];
  isHome:boolean = true;
  isLogin:boolean = true;
  invalidLogin:boolean = false;
  username:string;
  password:string;
  

  constructor(private userService:UserService, private route: ActivatedRoute, 
    private router:Router, private storage:LocalStorageService) { }

  ngOnInit() {
    this.isHome = true;
    this.userService.getAllUsers().then(data => {
      this.allUsers = <User[]>data;
      console.log(this.allUsers);
    });
  }

  Login(){
    //if authorized
    var _this = this;
    this.allUsers.forEach(function(user){
      if(_this.username == user.first_name && _this.password == user.password_n){
        _this.storage.storeOnLocalStorage(user);
        _this.isHome = false;
        _this.router.navigate(['user'], { relativeTo: _this.route });
      }
    });
    this.invalidLogin = true;
  }

  Register(){

  }

  LoginForm(){
    this.isLogin = true;
  }

  RegisterForm(){
    this.isLogin = false;
  }
}
