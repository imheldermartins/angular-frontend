import { Component, input } from '@angular/core';

@Component({
  selector: 'input[ui-input]',
  template: `<ng-content />`,
  host: {
    '[class]': 'getHostsClasses()',
  },
})
export class Input {
  variant = input<'default' | 'error'>('default');

  protected getHostsClasses() {
    const base = 'p-2 ring-1 rounded-lg outline-none';

    const variants = {
      default: 'ring-slate-300 focus:ring-slate-500',
      error: 'ring-red-500 text-red-500',
    };

    return `${base} ${variants[this.variant()]}`;
  }
}
