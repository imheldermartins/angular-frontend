import { Component, input } from '@angular/core';

@Component({
  selector: 'button[ui-button]',
  template: `
    <span>
      <ng-content />
    </span>
  `,
  host: {
    '[class]': 'getHostsClasses()',
  },
})
export class Button {
  variant = input<'default' | 'success' | 'error'>('default');

  protected getHostsClasses() {
    const base =
      'flex items-center justify-center px-3 py-2 cursor-pointer rounded-lg transition-colors duration-200';

    const variants = {
      default: 'text-slate-100 bg-slate-900 hover:bg-slate-800',
      success:
        'text-green-100 bg-green-500 border border-green-600 shadow-lg shadow-green-300 hover:bg-green-600',
      error:
        'text-red-100 bg-red-500 border border-red-600 shadow-lg shadow-red-300 hover:bg-red-600',
    };

    return `${base} ${variants[this.variant()]}`;
  }
}
