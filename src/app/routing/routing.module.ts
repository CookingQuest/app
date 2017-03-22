import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'app/home';
import { RouteComponent } from './route';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tutorial', loadChildren: 'app/tutorial#TutorialModule' },
  { path: 'login', loadChildren: 'app/login#LoginModule' },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [RouteComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouteComponent]
})
export class RoutingModule { }
