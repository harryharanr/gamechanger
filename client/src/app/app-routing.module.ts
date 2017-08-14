import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './guards/auth.guard';

// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  { 
      path: '', 
      redirectTo: 'login', 
      pathMatch: 'full' 
  },
  {
    path: 'login',
    component: LoginComponent // Default Route
  },
  {
    path: 'superadmin',
    loadChildren: 'app/superadmin/superadmin.module#SuperadminModule', // Default Route
    canActivate: [AuthGuard]
  },
  {
    path: 'hospitaladmin',
    loadChildren: 'app/hospitaladmin/hospitaladmin.module#HospitaladminModule', // Default Route
    canActivate: [AuthGuard]
  },
  { path: '**', component: LoginComponent } // "Catch-All" Route
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }