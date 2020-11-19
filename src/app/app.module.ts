import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { CommitComponent } from './commit/commit.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {ListboxModule} from 'primeng/listbox';
import {DropdownModule} from 'primeng/dropdown';
import {ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
<<<<<<< HEAD
import { DialogModule } from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
=======
>>>>>>> d52c7ef5985d54ca2918bb4bc00e06c44642adef

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CommitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ListboxModule,
    PanelModule,
    ButtonModule,
<<<<<<< HEAD
    DialogModule,
    InputTextareaModule
=======
>>>>>>> d52c7ef5985d54ca2918bb4bc00e06c44642adef
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
