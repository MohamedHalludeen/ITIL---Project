import { Component } from "@angular/core";
import { Incident } from "../adminShared/incident";
import { IncidentService } from "../adminShared/incident.service";
import { Router } from "@angular/router";
import { UserService  } from '../adminShared/user.service';

@Component({
    selector: 'create-incident',
    templateUrl: './incident-create.component.html',
    styleUrls: ['./incident-create.component.css']
})

export class IncidentCreateComponent {
    incidentTitle: string;
    incidentContent: string;
    incident: Incident;
    formDisplay : boolean = true;
    theUser: string;
    constructor(
        private incidentSVC: IncidentService, 
        private userSVC : UserService,
        private router: Router
    ){
        this.theUser = userSVC.loggedInUser;
    }

   createIncident() {
       this.incident = new Incident (
           this.incidentTitle,
           this.incidentContent 
       );
       this.incidentSVC.createIncident(this.incident);
       alert(`${this.incidentTitle} added to posts`);
       this.router.navigate(['/admin/incidents']);
   }

   cancel(){
        if(this.theUser ==="admin@psiog.com") {
        this.router.navigate(['admin/']);
    } else {
        this.router.navigate(['admin/user']);
    }
   }
}