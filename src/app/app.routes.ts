import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard, canActivateGuard } from './auth/auth.guard';
import { inject } from '@angular/core';


export const routes: Routes = [
   {
    path:'',
    pathMatch: 'full',
    redirectTo: 'login'
   },
   {
    path:'login',
    component: LoginComponent
   },
   {
      path:'home',
      component: HomeComponent,
      canActivate: [canActivateGuard]
   }

];
