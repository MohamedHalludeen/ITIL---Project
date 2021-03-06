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

    checkUser(){
        this.authUser = firebase.auth().currentUser;
        this.loggedInUser = this.authUser.email;
        var admin = "admin@psiog.com";
        if( this.loggedInUser == admin){
            return true;
        }
        else {
            return false;
        }
    }

    value = this.checkUser();

    closeIncident(single: Incident, set: string, userName: string, previousStatus: string ){
        
        if( userName === "admin@psiog.com" ) {
            if( previousStatus != "closed" && (set === "resolved" || set === "rejected")) {
                let verify = confirm('Are you sure you want to ' + set +' this incident?')
                if(verify == true) {
                this.incidentSVC.closeIncident(single, set);
                this.router.navigate(['/admin/']);
        }
        else {
            alert("Incident not Resolved / Rejected");
        }
            } else {
                alert("Incident is already closed / Resolved / Rejected")
            }
        } else {
            if( set === "closed" && (previousStatus === "resolved" || previousStatus === "rejected" || previousStatus ==="open") ) {
                let verify = confirm('Are you sure you want to ' + set +' this incident?')
                if(verify == true) {
                this.incidentSVC.closeIncident(single, set);
                this.router.navigate(['/admin/']);
        }
        else {
            alert("Incident not closed");
        }
            } else {
                alert("Incident is already closed")
            }
        }
        
        if(this.value){
        
     }

    }
}



