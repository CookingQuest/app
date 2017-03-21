import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tutorial', loadChildren: './tutorial#TutorialModule' },
  { path: 'login', loadChildren: './login#LoginModule' },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
