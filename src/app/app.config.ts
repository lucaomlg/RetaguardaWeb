import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { LoginService } from './services/login/login.service';
import { NavMenuService } from './services/navMenu/nav-menu.service';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { AuthService } from './auth/auth.service';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideToastr(),
    provideAnimations(),
    importProvidersFrom([BrowserAnimationsModule]),
    LoginService,
    NavMenuService,
    AuthService
  ]
};
