import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { assetservice } from '../adminShared/asset.service';
import { asset } from '../adminShared/asset';

@Component({
    templateUrl: './asset.component.html',
    styleUrls: ['./asset.component.css']
})

export class assetcomponent implements OnInit {
    theUser: string;
    menuChoice: string;
    assets: asset[];
    formDisplay: boolean = true;
    singleasset: asset;
    authUser: any;
    loggedInUser: string;

    constructor(
        private userSVC: UserService,
        private router: Router,
        private assetsVC: assetservice
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
        let dbRef = firebase.database().ref('asset/');
        dbRef.once('value')
        .then((snapshot)=> {
            let tmp: string[] = snapshot.val();
            this.assets = Object.keys(tmp).map(key => tmp[key])
        });
    }
    editasset(theasset: asset){
        this.singleasset = theasset;
        this.formDisplay = false;
    }

    cancelEdit(){
        this.formDisplay = true;
    }

    updateasset(single: asset) {
        this.assetsVC.editasset(single);
        this.formDisplay = true;
    }

    closeasset(single: asset){
        this.authUser = firebase.auth().currentUser;
        this.loggedInUser = this.authUser.email;
        
        
        let verify = confirm('Are you sure you want to close this asset?')
        if(verify == true) {
            this.assetsVC.closeasset(single);
            this.router.navigate(['/admin/']);
        }
        else {
            alert("asset not closed ! Please try again !");
        }
    }
    }