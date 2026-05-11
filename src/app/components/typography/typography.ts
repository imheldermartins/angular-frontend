import { Directive, ElementRef, inject, computed, Input, input } from '@angular/core';
import { cn } from '../../../utils/cn';

@Directive({
  selector:
    'h1[typography], h2[typography], h3[typography], p[typography], span[typography], a[typography]',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Typography {
  private elementRef = inject(ElementRef);

  className = input<string>('', { alias: 'class' });

  protected hostClasses = computed(() => {
    const base = 'text-slate-700 antialiased';
    /**
     * Returns tag name as h1, h2, h3, p, span and then applies the corresponding styles based on the tag name.
     */
    const tagName = this.elementRef.nativeElement.tagName.toLowerCase();

    const stylesByTag: Record<string, string> = {
      h1: 'text-3xl font-bold',
      h2: 'text-2xl font-semibold',
      h3: 'text-xl font-medium',
      p: 'text-base font-normal',
      span: 'text-sm font-normal',
      a: 'font-bold text-slate-700 hover:text-slate-600',
    };

    return cn(base, stylesByTag[tagName], this.className());
  });
}
