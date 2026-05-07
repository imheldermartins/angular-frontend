import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Button } from './components/button/button';
import { Typography } from './components/typography/typography';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Typography],
  templateUrl: './app.html',
})
export class App {
  count = signal(0);

  decrement() {
    this.count.update((c) => {
      if (c === 0) {
        return c;
      }

      return c - 1;
    });
  }

  increment() {
    this.count.update((c) => c + 1);
  }
}
