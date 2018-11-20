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
    formDisplay: boolean = true;
    singleIncident: Incident;
    authUser: any;
    loggedInUser: string;

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
        this.formDisplay= true;
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

    editIncident(theIncident: Incident){
        this.singleIncident = theIncident;
        this.formDisplay = false;
    }

    cancelEdit(){
        this.formDisplay = true;
    }

    updateIncident(single: Incident) {
        this.incidentSVC.editIncident(single);
        this.formDisplay = true;
    }

    closeIncident(single: Incident){
        this.authUser = firebase.auth().currentUser;
        this.loggedInUser = this.authUser.email;
        var admin = "admin@psiog.com";
        if( this.loggedInUser == admin){
        let verify = confirm('Are you sure you want to close this incident?')
        if(verify == true) {
            this.incidentSVC.closeIncident(single);
            this.router.navigate(['/admin/']);
        }
        else {
            alert("Incident not closed, as incidents can only be closed by admin");
        }
    }
    }



}



