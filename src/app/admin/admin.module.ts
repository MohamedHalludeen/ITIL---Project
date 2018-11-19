import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './adminComponent/admin.component';
import { AdminMenuComponent } from './adminMenu/admin-menu.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signUp/sign-up.component';
import { UserMenuComponent } from './userMenu/user-menu.component';

import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { UserService } from './adminShared/user.service';
import { IncidentService } from './adminShared/incident.service';
import { IncidentComponent } from './incident/incident.component';
import { IncidentCreateComponent } from './incidentCreate/incident-create.component';

const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'incidents', component: IncidentComponent, canActivate: [UserService]},
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'user', component: UserMenuComponent, canActivate: [UserService] },
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
        IncidentComponent,
        IncidentCreateComponent
    ],
    providers: [
        UserService,
        IncidentService
    ]
})
export class AdminModule {}