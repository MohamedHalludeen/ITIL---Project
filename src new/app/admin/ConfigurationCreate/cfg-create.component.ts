import { Component } from "@angular/core";
import { cfg } from "../adminShared/cfg";
import { cfgService } from "../adminShared/cfg.service";
import { Router } from "@angular/router";

@Component({
    selector: 'create-cfg',
    templateUrl: './cfg-create.component.html',
    styleUrls: ['./cfg-create.component.css']
})

export class cfgCreateComponent {
    cfgTitle: string;
    cfgtype: string;
    cfgresource: string;
    cfgContent: string;
    cfg: cfg;
    

    constructor(
        private cfgSVC: cfgService, 
        private router: Router
    ){}

   createcfg() {
       this.cfg = new cfg (
           this.cfgTitle,
           this.cfgtype,
           this.cfgresource,
           this.cfgContent,
       );
       this.cfgSVC.createcfg(this.cfg);
       alert(`${this.cfgTitle} added to posts`);
       this.router.navigate(['/admin/Configuration']);
   }

   cancel(){
       this.router.navigate(['/admin/Configuration']);
   }
}