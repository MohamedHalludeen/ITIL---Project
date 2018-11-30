import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { asset } from './asset';


@Injectable()

export class assetservice {
    authUser: any;
    loggedInUser: string;

    createasset(asset: asset){
         this.authUser = firebase.auth().currentUser;
         let dbRef = firebase.database().ref('asset/');
         let newasset = dbRef.push();
         newasset.set({
             title: asset.title,
             type: asset.type,
             resource: asset.resource,
             content: asset.content,
             userName: this.authUser.email,
             id: newasset.key ,
             status: "open"
         })
         .catch ((error) =>{
              alert(`failed upload: ${error}`);
        });
    }
    editasset ( update: asset) {
        let dbRef = firebase.database().ref('assets/').child(update.id)
        .update({
            title: update.title,
            type: update.type,
            resource: update.resource,
            content: update.content
            
            
        });
        alert('asset updated');
    }

    closeasset (closeasset: asset){
        this.authUser = firebase.auth().currentUser;
        this.loggedInUser = this.authUser.email;
        
        
        let dbRef = firebase.database().ref('asset/').child(closeasset.id)
        .update({
            status: "closed"
        });
        alert('asset closed'); 
    }
    }

