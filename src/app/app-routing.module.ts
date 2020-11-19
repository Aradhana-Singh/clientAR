import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommitComponent} from './commit/commit.component'
import { HomeComponent } from './home/home.component';
import {RegisterComponent} from './register/register.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {path: '' , redirectTo:"/home", pathMatch:"full" },
  {path: 'home', component: HomeComponent},
  {path: 'commit', component:CommitComponent},
  {path: 'settings', component:RegisterComponent},
  {path: 'authenticate', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
