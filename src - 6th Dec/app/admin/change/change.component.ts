import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { changeservice } from '../adminShared/change.service';
import { change } from '../adminShared/change';


@Component({
    templateUrl: './change.component.html',
    styleUrls: ['./change.component.css']
})

export class changecomponent implements OnInit {
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
    
    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    chooseMode(mode: string){
        this.menuChoice = mode;
        this.formDisplay= true;
    }

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

    editchange(thechange: change, previousStatus : string){
        if(previousStatus != "closed"){
        this.singlechange = thechange;
        this.formDisplay = false;
        } else {
            alert("the change is already closed");
        }
    }

    cancelEdit(){
        this.formDisplay = true;
    }

    updatechange(single: change) {
        this.changeSVC.editchange(single);
        this.formDisplay = true;
    }
 }