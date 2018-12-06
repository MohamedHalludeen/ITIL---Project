import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { problem } from './problem';


@Injectable()

export class problemservice {
    authUser: any;
    loggedInUser: string;

    createproblem(problem: problem){
         this.authUser = firebase.auth().currentUser;
         let dbRef = firebase.database().ref('problem/');
         let newproblem = dbRef.push();
         newproblem.set({
             title: problem.title,
             content: problem.content,
             userName: this.authUser.email,
             id: newproblem.key ,
             status: "open"
         })
         .catch ((error) =>{
              alert(`failed upload: ${error}`);
        });
    }
    editproblem ( update: problem) {
        let dbRef = firebase.database().ref('problems/').child(update.id)
        .update({
            title: update.title,
            content: update.content
            
            
        });
        alert('problem updated');
    }

    closeproblem (closeproblem: problem){
        this.authUser = firebase.auth().currentUser;
        this.loggedInUser = this.authUser.email;
        
        
        let dbRef = firebase.database().ref('problem/').child(closeproblem.id)
        .update({
            status: "closed"
        });
        alert('problem closed'); 
    }
    }

