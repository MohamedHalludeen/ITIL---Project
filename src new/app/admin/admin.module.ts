import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './adminComponent/admin.component';
import { AdminMenuComponent } from './adminMenu/admin-menu.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signUp/sign-up.component';
import { UserMenuComponent } from './userMenu/user-menu.component';
import { TruncatePipe } from './adminShared/trunc.pipe';

import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { UserService } from './adminShared/user.service';
import { cfgService } from './adminShared/cfg.service';
import { cfgComponent } from './Configuration/cfg.component';
import { cfgCreateComponent } from './ConfigurationCreate/cfg-create.component';
import { problemservice } from './adminShared/problem.service';
import { problemComponent } from './problem/problem.component';
import { problemCreateComponent } from './problemCreate/problem-create.component';
import { assetservice } from './adminShared/asset.service';
import { assetcomponent } from './asset/asset.component';
import { assetcreatecomponent } from './assetcreate/asset-create.component';
import { IncidentService } from './adminShared/incident.service';
import { IncidentComponent } from './incident/incident.component';
import { IncidentCreateComponent } from './incidentCreate/incident-create.component';
import { changeservice } from './adminShared/change.service';
import { changecomponent } from './change/change.component';
import { changeCreateComponent } from './changecreate/change-create.component';
import { releasecomponent } from './release-deployment/release-deployment.component';


const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'Configuration', component: cfgComponent, canActivate: [UserService]},
            { path: 'problem', component: problemComponent, canActivate: [UserService]},
            { path: 'asset', component: assetcomponent, canActivate: [UserService]},
            { path: 'incidents', component: IncidentComponent, canActivate: [UserService]},
            { path: 'change', component: changecomponent , canActivate: [UserService]},
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'user', component: UserMenuComponent, canActivate: [UserService] },
            { path: 'release', component: releasecomponent, canActivate: [UserService] },
            { path: '', component: AdminMenuComponent, canActivate: [UserService] }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(AdminRoutes),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
    ],
    exports: [
        RouterModule
        
    ],
    declarations: [
        AdminComponent,
        AdminMenuComponent,
        UserMenuComponent,
        LoginComponent,
        SignUpComponent,
        cfgComponent,
        cfgCreateComponent,
        TruncatePipe,
        problemComponent,
        problemCreateComponent,
        assetcomponent,
        assetcreatecomponent,
        IncidentComponent,
        IncidentCreateComponent,
        changecomponent,
        changeCreateComponent,
        releasecomponent
        
    ],
    providers: [
        UserService,
        cfgService,
        problemservice,
        assetservice,
        IncidentService,
        changeservice
    ]
})
export class AdminModule {}