import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { change } from './change';

@Injectable()

export class changeservice {
        authUser: any;

    createchange(change: change){
        this.authUser = firebase.auth().currentUser;
        let dbRef = firebase.database().ref('changes/');
        let newchange = dbRef.push();
        newchange.set({
            title: change.title,
            description: change.description,
            startTime : change.startTime,
            endTime: change.endTime,
            impactedService: change.impactService,
            assignedTo: change.assignedTo,
            contact: change.contact,
            createdBy: this.authUser.email,
            id: newchange.key ,
            status: "open",
            resolution: ""
        })
        .catch ((error) =>{
             alert(`failed upload: ${error}`);
       });
   }
   editchange ( update: change , set : string) {
    let dbRef = firebase.database().ref('changes/').child(update.id)
    .update({
        title: update.title,
        description: update.description,
        startTime : update.startTime,
        endTime : update.endTime,
        impactedService : update.impactService,
        assignedTo: update.assignedTo,
        contact: update.contact,
        status: set
    });
    alert('change updated');
}

closechange (closechange: change, set: string, resolution: string ){
    let dbRef = firebase.database().ref('changes/').child(closechange.id);
    dbRef.update({
        status: set,
        resolution: resolution
    });
    alert('change ' + set); 
}
}
