import { Component } from "@angular/core";
import { asset } from "../adminShared/asset";
import { assetservice } from "../adminShared/asset.service";
import { Router } from "@angular/router";

@Component({
    selector: 'create-asset',
    templateUrl: './asset-create.component.html',
    styleUrls: ['./asset-create.component.css']
})

export class assetcreatecomponent {
    assettitle: string;
    assettype: string;
    assetresource: string;
    assetcontent: string;
    asset: asset;
    

    constructor(
        private assetSVC: assetservice, 
        private router: Router
    ){}

   createasset() {
       this.asset = new asset (
           this.assettitle,
           this.assettype,
           this.assetresource,
           this.assetcontent,
       );
       this.assetSVC.createasset(this.asset);
       alert(`${this.assettitle} added to posts`);
       this.router.navigate(['/admin/asset']);
   }

   cancel(){
       this.router.navigate(['/admin/asset']);
   }
}