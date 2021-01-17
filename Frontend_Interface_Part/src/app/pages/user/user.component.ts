import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/domains/User';
import { LocalStorageService } from 'app/services/localStorageService';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{

    private user:User;
    private name:string;

    constructor(private storage: LocalStorageService, private route: ActivatedRoute, 
        private router:Router) {​​ }
    
    ngOnInit(){
        this.user = this.storage.getFromLocalStorage();
        this.name = this.user.first_name + " " + this.user.last_name
    }

    signout(){
        this.router.navigate(['/'], { relativeTo: this.route });
        window.location.reload();
    }
}
