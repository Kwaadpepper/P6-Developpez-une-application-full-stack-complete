import { registerLocaleData } from '@angular/common'
import localeFr from '@angular/common/locales/fr'
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter, TitleStrategy } from '@angular/router'
import Aura from '@primeng/themes/aura'
import { providePrimeNG } from 'primeng/config'

import { provideHttpClient } from '@angular/common/http'
import { provideMarkdown } from 'ngx-markdown'
import { MessageService } from 'primeng/api'
import { routes } from './app.routes'
import { DynamicTitleStrategy } from './lib/strategies/DynamicTitleStrategy'

registerLocaleData(localeFr)

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: false,
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
    provideHttpClient(),
    provideMarkdown(),
    { provide: TitleStrategy, useClass: DynamicTitleStrategy },
    { provide: MessageService, useClass: MessageService },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
}
