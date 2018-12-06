import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { cfg } from './cfg';


@Injectable()

export class cfgService {
    authUser: any;
    loggedInUser: string;

    createcfg(cfg: cfg){
         this.authUser = firebase.auth().currentUser;
         let dbRef = firebase.database().ref('Configuration/');
         let newcfg = dbRef.push();
         newcfg.set({
             title: cfg.title,
             type: cfg.type,
             resource: cfg.resource,
             content: cfg.content,
             userName: this.authUser.email,
             id: newcfg.key ,
             status: "open"
         })
         .catch ((error) =>{
              alert(`failed upload: ${error}`);
        });
    }
    editcfg ( update: cfg) {
        let dbRef = firebase.database().ref('cfgs/').child(update.id)
        .update({
            title: update.title,
            type: update.type,
            resource: update.resource,
            content: update.content
            
            
        });
        alert('cfg updated');
    }

    closecfg (closecfg: cfg){
        this.authUser = firebase.auth().currentUser;
        this.loggedInUser = this.authUser.email;
        
        
        let dbRef = firebase.database().ref('Configuration/').child(closecfg.id)
        .update({
            status: "closed"
        });
        alert('cfg closed'); 
    }
    }

