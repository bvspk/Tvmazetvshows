import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tvshows';
  getRedirectString = ((origin: string, hrefUrl?: string):string => 
    (origin.indexOf('dev') > -1 ? 
      'https://test.xxx.com/autho/logout.html?redirectTo=':
      'https://prod.xxx.com/autho/logout.html?redirectTo='
    ) + hrefUrl);
}
