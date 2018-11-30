import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { changeservice } from '../adminShared/change.service';
import { change } from '../adminShared/change';


@Component({
    templateUrl: './release-deployment.component.html',
    styleUrls: ['./release-deployment.component.css']
})

export class releasecomponent implements OnInit {
    theUser: string;
    menuChoice: string;
    changes: change[];
    formDisplay: boolean = true;
    singlechange: change;
    authUser: any;
    loggedInUser: string;

    constructor(
        private userSVC: UserService,
        private router: Router,
        private changeSVC: changeservice
    ){}

    ngOnInit(){
        this.theUser = this.userSVC.loggedInUser;
        this.getPosts();
    }

    getPosts(){
        let dbRef = firebase.database().ref('changes/');
        dbRef.once('value')
        .then((snapshot)=> {
            let tmp: string[] = snapshot.val();
            this.changes = Object.keys(tmp).map(key => tmp[key])
        });
    }

    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }
 }



