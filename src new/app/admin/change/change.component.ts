import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { changeservice } from '../adminShared/change.service';
import { change } from '../adminShared/change';


@Component({
    templateUrl: './change.component.html',
    styleUrls: ['./change.component.css']
})

export class changecomponent implements OnInit {
    theUser: string;
    menuChoice: string;
    changes: change[];
    formDisplay: boolean = true;
    singlechange: change;
    authUser: any;
    loggedInUser: string;

    constructor(
        private userSVC: UserService,
        private router: Router,
        private changeSVC: changeservice
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
        let dbRef = firebase.database().ref('changes/');
        dbRef.once('value')
        .then((snapshot)=> {
            let tmp: string[] = snapshot.val();
            this.changes = Object.keys(tmp).map(key => tmp[key])
        });
    }

    editchange(thechange: change, previousStatus : string){
        if(previousStatus != "closed"){
        this.singlechange = thechange;
        this.formDisplay = false;
        } else {
            alert("the change is already closed");
        }
    }

    cancelEdit(){
        this.formDisplay = true;
    }

    updatechange(single: change, set : string, resolution: string) {
        this.changeSVC.closechange(single);
        this.formDisplay = true;
    }

//     closechange(single: change, set: string, userName: string, previousStatus: string, resolution: string ){
        
//         if( userName === "admin@psiog.com" ) {
//             if( previousStatus != "closed" && (set === "resolved" || set === "rejected")) {
//                 let verify = confirm('Are you sure you want to ' + set +' this change?')
//                     if(verify == true) {
//                     this.changeSVC.closechange(single, set, resolution);
//                     this.router.navigate(['/admin/']);
//                 } else {
//                     alert("change not Resolved / Rejected");
//                 }
//             } else if (previousStatus === "closed"){
//                 alert("change is already closed");
//             } else if (previousStatus === "resolved" || previousStatus === "rejected") {
//                 alert("change already resolved / rejected");
//             }
//         } else {
//             if( set === "closed" && (previousStatus === "resolved" || previousStatus === "rejected" || previousStatus ==="open") ) {
//                 let verify = confirm('Are you sure you want to ' + set +' this change?')
//                 if(verify == true) {
//                 this.changeSVC.closechange(single, set, resolution);
//                 this.router.navigate(['/admin/']);
//         }
//         else {
//             alert("change not closed");
//         }
//             } else {
//                 alert("change is already closed")
//             }
//         }
//     }
 }



