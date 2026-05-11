import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';
import aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: aura,
        options: {
          darkModeSelector: false,
        },
      },
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};
