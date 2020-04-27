import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';


const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home/:access_token/:refresh_token',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'result',
    component: ResultComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
