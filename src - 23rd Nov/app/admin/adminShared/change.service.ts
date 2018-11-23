import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Change } from './change';

@Injectable()

export class ChangeComponent {
        authUser: any;

    createChange(change: Change){
        this.authUser = firebase.auth().currentUser;
        let dbRef = firebase.database().ref('changes/');
        let newChange = dbRef.push();
        newChange.set({
            title: change.title,
            description: change.description,
            createdBy: this.authUser.email,
            startTime : change.startTime,
            endTime: change.endTime,
            impactedService: change.impactService,
            assignedTo: change.assignedTo,
            contact: change.contact,
            id: newChange.key ,
            status: "open"
        })
        .catch ((error) =>{
             alert(`failed upload: ${error}`);
       });
   }

}