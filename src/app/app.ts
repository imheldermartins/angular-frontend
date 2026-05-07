import { Component, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { Button } from './components/button/button'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button],
  templateUrl: './app.html'
})
export class App {
  count = signal(0);

  increment() {
    this.count.update(c => c + 1)
  }
}
