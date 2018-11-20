import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Incident } from '../adminShared/incident';


@Injectable()

export class IncidentService {
    authUser: any;
    loggedInUser: string;

    createIncident(incident: Incident){
         this.authUser = firebase.auth().currentUser;
         let dbRef = firebase.database().ref('incidents/');
         let newIncident = dbRef.push();
         newIncident.set({
             title: incident.title,
             content: incident.content,
             userName: this.authUser.email,
             id: newIncident.key ,
             status: "open"
         })
         .catch ((error) =>{
              alert(`failed upload: ${error}`);
        });
    }

    editIncident ( update: Incident) {
        let dbRef = firebase.database().ref('incidents/').child(update.id)
        .update({
            title: update.title,
            content: update.content
        });
        alert('incident updated');
    }

    closeIncident (closeIncident: Incident){
        this.authUser = firebase.auth().currentUser;
        this.loggedInUser = this.authUser.email;
        var admin = "admin@psiog.com";
        if( this.loggedInUser == admin){
        let dbRef = firebase.database().ref('incidents/').child(closeIncident.id)
        .update({
            status: "closed"
        });
        alert('incident closed'); 
    }
    }

}