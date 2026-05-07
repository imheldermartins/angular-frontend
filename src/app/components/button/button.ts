import { Component } from '@angular/core';

@Component({
  selector: 'button[ui-button]',
  template: `
    <button class="bg-blue-500 p-3 text-white rounded-lg cursor-pointer hover:bg-blue-600">
      <ng-content></ng-content>
    </button>
  `
})
export class Button {}
