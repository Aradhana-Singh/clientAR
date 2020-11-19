import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommitComponent} from './commit/commit.component'
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './layouts/app-layout.component';
import {RegisterComponent} from './register/register.component';
import { UserComponent } from './user/user.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '' , redirectTo:"/home", pathMatch:"full" },
  // {path: 'home', component: HomeComponent,  canActivate: [AuthGuard]},
  
  // {path: 'authenticate', component: UserComponent},
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'authenticate',
        component: UserComponent
      }
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'commit', component: CommitComponent},
      {path: 'settings', component: RegisterComponent},
    ]
  },
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
