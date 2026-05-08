import { Component, computed, input } from '@angular/core';
import { Typography } from '../typography/typography';
import { Field, FormField } from '@angular/forms/signals';
import { NgClass } from '@angular/common';

@Component({
  selector: 'text-input',
  imports: [FormField, NgClass, Typography],
  template: `
    <div class="w-full flex flex-col gap-1 items-start">
      @if (label()) {
        <label [for]="id()" class="text-sm font-medium text-zinc-700">
          {{ label() }}
        </label>
      }

      <input
        [type]="type()"
        [id]="id()"
        [placeholder]="placeholder()"
        [formField]="field()"
        class="w-full p-2 ring-1 rounded-lg outline-none transition-all"
        [ngClass]="{
          'ring-red-500 text-red-600 bg-red-50 focus:ring-red-600': hasError(),
          'ring-slate-300 focus:ring-slate-500': !hasError(),
        }"
      />

      @if (hasError()) {
        @for (error of errors(); track error.kind) {
          <span typography class="text-red-500">{{ error.message }}</span>
        }
      }
    </div>
  `,
})
export class Input {
  type = input<'text' | 'number' | 'email' | 'password'>('text');

  label = input<string>('');
  placeholder = input<string>('');

  field = input.required<Field<string>>();

  id = input<string>(`input-${Math.random().toString(36).substring(2, 9)}`);

  protected hasError = computed(() => {
    const state = this.field()();
    return state?.invalid() && (state.dirty() || state.touched());
  });

  protected errors = computed(() => {
    const state = this.field()();
    return state.errors() || [];
  });
}
