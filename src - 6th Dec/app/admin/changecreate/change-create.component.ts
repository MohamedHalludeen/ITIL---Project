import { Component } from "@angular/core";
import { change } from "../adminShared/change";
import { changeservice } from "../adminShared/change.service";
import { Router } from "@angular/router";
import { UserService  } from '../adminShared/user.service';

@Component({
    selector: 'create-change',
    templateUrl: './change-create.component.html',
    styleUrls: ['./change-create.component.css']
})

export class changeCreateComponent {
    changeTitle: string;
    changeContent: string;
    change: change;
    changeStartDate: Date;
    changeEndDate: Date;
    changeAssignedTo: string;
    changeImpactService: string;
    formDisplay : boolean = true;
    theUser: string;
    constructor(
        private changeSVC: changeservice, 
        private userSVC : UserService,
        private router: Router
    ){
        this.theUser = userSVC.loggedInUser;
    }

   createchange() {
       this.change = new change (
           this.changeTitle,
           this.changeContent,
           this.changeStartDate,
           this.changeEndDate,
           this.changeAssignedTo,
           this.theUser,
           this.changeImpactService,
           this.theUser
       );
       this.changeSVC.createchange(this.change);
       alert(`${this.changeTitle} added to posts`);
       this.router.navigate(['/admin/change']);
   }

   cancel(){
        if(this.theUser ==="admin@psiog.com") {
        this.router.navigate(['admin/']);
    } else {
        this.router.navigate(['admin/user']);
    }
   }
}