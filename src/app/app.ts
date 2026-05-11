import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Typography } from './components/typography/typography';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Typography],
  templateUrl: './app.html',
})
export class App {
  navLinks = [
    { label: 'Dashboard', routerLink: '/dashboard', icon: 'pi pi-home' },
    { label: 'Cadastro de Usuários', routerLink: '/sign-up', icon: 'pi pi-user-plus' },
    { label: 'Login', routerLink: '/sign-in', icon: 'pi pi-sign-in' },
  ];
}
