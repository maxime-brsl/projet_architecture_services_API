import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http'; // Nouvelle approche standalone

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection(),
    { provide: PLATFORM_ID, useValue: 'browser' },
    provideHttpClient() // Configuration standalone pour HttpClient
  ]
}).catch(err => console.error(err));
