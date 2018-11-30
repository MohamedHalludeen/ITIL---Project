import { Component } from "@angular/core";
import { problem } from "../adminShared/problem";
import { problemservice } from "../adminShared/problem.service";
import { Router } from "@angular/router";

@Component({
    selector: 'create-problem',
    templateUrl: './problem-create.component.html',
    styleUrls: ['./problem-create.component.css']
})

export class problemCreateComponent {
    problemtitle: string;
    problemcontent: string;
    problem: problem;
    

    constructor(
        private problemSVC: problemservice, 
        private router: Router
    ){}

   createproblem() {
       this.problem = new problem (
           this.problemtitle,
           this.problemcontent,
       );
       this.problemSVC.createproblem(this.problem);
       alert(`${this.problemtitle} added to posts`);
       this.router.navigate(['/admin/problem']);
   }

   cancel(){
       this.router.navigate(['/admin/problem']);
   }
}