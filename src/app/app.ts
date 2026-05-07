import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Button } from './components/button/button';
import { Typography } from './components/typography/typography';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Typography],
  templateUrl: './app.html',
})
export class App {
  navLinks = [
    { label: 'Dashboard', routerLink: '/dashboard' },
    { label: 'Login', routerLink: '/sign-in' },
  ];
}
