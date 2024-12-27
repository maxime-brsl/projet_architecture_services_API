import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
export class AppComponent implements OnInit {
  title = 'The Real Deal';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Vérifiez si nous sommes dans un environnement de navigateur
    if (isPlatformBrowser(this.platformId)) {
      // Code qui accède à `document` ou autres objets spécifiques au navigateur
      console.log('Running in the browser');
    }
  }
}
