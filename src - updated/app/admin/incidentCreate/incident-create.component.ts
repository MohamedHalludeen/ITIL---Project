import { Component } from "@angular/core";
import { Incident } from "../adminShared/incident";
import { IncidentService } from "../adminShared/incident.service";
import { Router } from "@angular/router";

@Component({
    selector: 'create-incident',
    templateUrl: './incident-create.component.html',
    styleUrls: ['./incident-create.component.css']
})

export class IncidentCreateComponent {
    incidentTitle: string;
    incidentContent: string;
    incident: Incident;
    //formDisplay : boolean = true;

    constructor(
        private incidentSVC: IncidentService, 
        private router: Router
    ){}

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
        this.router.navigate(['/admin']);
   }
}