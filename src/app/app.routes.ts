import { Routes } from '@angular/router';
import { SignIn } from './pages/sign-in/sign-in';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard, title: 'Dashboard' },
  { path: 'sign-in', component: SignIn, title: 'Entrar' },
  { path: '**', redirectTo: 'dashboard' },
];
