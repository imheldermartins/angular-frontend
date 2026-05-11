import { Routes } from '@angular/router';
import { SignIn } from './pages/sign-in/sign-in';
import { Dashboard } from './pages/dashboard/dashboard';
import { SignUp } from './pages/sign-up/sign-up';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard, title: 'Dashboard' },
  { path: 'sign-in', component: SignIn, title: 'Entrar' },
  { path: 'sign-up', component: SignUp, title: 'Cadastrar' },
  { path: '**', redirectTo: 'dashboard' },
];
