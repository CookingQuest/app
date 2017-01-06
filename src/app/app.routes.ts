import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';

export const ROUTES: Routes = [
    { data: { name: 'Index' }, path: '', component: HomeComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];
