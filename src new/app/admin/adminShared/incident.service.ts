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

    closeIncident (closeIncident: Incident, set: string, ){
        let dbRef = firebase.database().ref('incidents/').child(closeIncident.id);
        dbRef.update({
            status: set
        });
        alert('incident ' + set); 
    }
}