import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Incident } from '../adminShared/incident';


@Injectable()

export class IncidentService {
    authUser: any;

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
}