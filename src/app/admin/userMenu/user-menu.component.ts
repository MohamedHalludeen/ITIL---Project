import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';


@Component({
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.css']
})

export class UserMenuComponent implements OnInit { 
    theUser : string;
    constructor( private userSVC: UserService, private router: Router){}

    ngOnInit(){
        this.theUser = this.userSVC.loggedInUser;
    }

    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }
}