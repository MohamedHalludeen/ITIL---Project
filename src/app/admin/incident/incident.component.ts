import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { IncidentService } from '../adminShared/incident.service';
import { Incident } from '../adminShared/incident';

@Component({
    templateUrl: './incident.component.html',
    styleUrls: ['./incident.component.css']
})

export class IncidentComponent implements OnInit {
    theUser: string;
    menuChoice: string;
    incidents: Incident[];

    constructor(
        private userSVC: UserService,
        private router: Router,
        private incidentSVC: IncidentService
    ){}
    
    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    chooseMode(mode: string){
        this.menuChoice = mode;

    }

    ngOnInit(){
        this.theUser = this.userSVC.loggedInUser;
        this.getPosts();
    }

    getPosts(){
        let dbRef = firebase.database().ref('incidents/');
        dbRef.once('value')
        .then((snapshot)=> {
            let tmp: string[] = snapshot.val();
            this.incidents = Object.keys(tmp).map(key => tmp[key])
        });
    }

}


