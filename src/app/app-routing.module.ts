import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommitComponent} from './commit/commit.component'
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './layouts/app-layout.component';
import {RegisterComponent} from './register/register.component';
import { UserComponent } from './user/user.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { Page404Component } from './page404/page404.component';
import { FutureScopeComponent } from './future-scope/future-scope.component';
import { DeployComponent } from './deploy/deploy.component';

const routes: Routes = [
  {path: '' , redirectTo:"/home", pathMatch:"full" },
  // {path: 'home', component: HomeComponent,  canActivate: [AuthGuard]},
  
  // {path: 'authenticate', component: UserComponent},
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'commit', component: CommitComponent, canActivate: [AuthGuard]},
      {path: 'settings', component: RegisterComponent, canActivate: [AuthGuard]},
      {path: 'future', component: FutureScopeComponent, canActivate: [AuthGuard]},
      {path: 'deploy', component:DeployComponent, canActivate: [AuthGuard]}
    ]
  },
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
  
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
