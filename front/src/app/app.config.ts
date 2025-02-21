import { registerLocaleData } from '@angular/common'
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import localeFr from '@angular/common/locales/fr'
import { ApplicationConfig, LOCALE_ID, ErrorHandler as NgErrorHandler, provideZoneChangeDetection } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter, RouteReuseStrategy, TitleStrategy } from '@angular/router'
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown'
import { MessageService } from 'primeng/api'
import { providePrimeNG } from 'primeng/config'

import { routes } from './app.routes'
import { ErrorHandler } from './core/ErrorHandler'
import { SessionInterceptor } from './interceptor/session.interceptor'
import { DynamicTitleStrategy, MddRouteReuseStrategy } from './strategies'
import OpenClassrooms from './themes/OpenClassrooms'

registerLocaleData(localeFr)

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: false,
      theme: {
        preset: OpenClassrooms,
        options: {
          darkModeSelector: 'system',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          silent: true,
          breaks: true,
          pedantic: false,
        },
      },
    }),
    { provide: TitleStrategy, useClass: DynamicTitleStrategy },
    { provide: MessageService, useClass: MessageService },
    { provide: NgErrorHandler, useClass: ErrorHandler },
    { provide: RouteReuseStrategy, useClass: MddRouteReuseStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
}
