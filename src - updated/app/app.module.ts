import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NavComponent } from './shared/navbar.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
