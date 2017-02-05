import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { TutorialComponent } from './tutorial';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];
