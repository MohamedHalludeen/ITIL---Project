import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { problemservice } from '../adminShared/problem.service';
import { problem } from '../adminShared/problem';

@Component({
    templateUrl: './problem.component.html',
    styleUrls: ['./problem.component.css']
})

export class problemComponent implements OnInit {
    theUser: string;
    menuChoice: string;
    problems: problem[];
    formDisplay: boolean = true;
    singleproblem: problem;
    authUser: any;
    loggedInUser: string;

    constructor(
        private userSVC: UserService,
        private router: Router,
        private problemsVC: problemservice
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
        let dbRef = firebase.database().ref('problem/');
        dbRef.once('value')
        .then((snapshot)=> {
            let tmp: string[] = snapshot.val();
            this.problems = Object.keys(tmp).map(key => tmp[key])
        });
    }
    editproblem(theproblem: problem){
        this.singleproblem = theproblem;
        this.formDisplay = false;
    }

    cancelEdit(){
        this.formDisplay = true;
    }

    updateproblem(single: problem) {
        this.problemsVC.editproblem(single);
        this.formDisplay = true;
    }

    closeproblem(single: problem){
        this.authUser = firebase.auth().currentUser;
        this.loggedInUser = this.authUser.email;
        
        
        let verify = confirm('Are you sure you want to close this problem?')
        if(verify == true) {
            this.problemsVC.closeproblem(single);
            this.router.navigate(['/admin/']);
        }
        else {
            alert("problem not closed ! Please try again !");
        }
    }
    }