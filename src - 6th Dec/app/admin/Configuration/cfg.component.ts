import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { cfgService } from '../adminShared/cfg.service';
import { cfg } from '../adminShared/cfg';

@Component({
    templateUrl: './cfg.component.html',
    styleUrls: ['./cfg.component.css']
})

export class cfgComponent implements OnInit {
    theUser: string;
    menuChoice: string;
    cfgs: cfg[];
    formDisplay: boolean = true;
    singlecfg: cfg;
    authUser: any;
    loggedInUser: string;

    constructor(
        private userSVC: UserService,
        private router: Router,
        private cfgsVC: cfgService
    ){}
    
    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    chooseMode(mode: string){
        this.menuChoice = mode;

    }

    ngOnInit(){
        this.theUser = this.userSVC.loggedInUser;
        this.getPosts();
    }

    getPosts(){
        let dbRef = firebase.database().ref('Configuration/');
        dbRef.once('value')
        .then((snapshot)=> {
            let tmp: string[] = snapshot.val();
            this.cfgs = Object.keys(tmp).map(key => tmp[key])
        });
    }
    editcfg(thecfg: cfg){
        this.singlecfg = thecfg;
        this.formDisplay = false;
    }

    cancelEdit(){
        this.formDisplay = true;
    }

    updatecfg(single: cfg) {
        this.cfgsVC.editcfg(single);
        this.formDisplay = true;
    }

    closecfg(single: cfg){
        this.authUser = firebase.auth().currentUser;
        this.loggedInUser = this.authUser.email;
        
        
        let verify = confirm('Are you sure you want to close this cfg?')
        if(verify == true) {
            this.cfgsVC.closecfg(single);
            this.router.navigate(['/admin/']);
        }
        else {
            alert("cfg not closed ! Please try again !");
        }
    }
    }




