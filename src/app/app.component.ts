import { Component } from '@angular/core';

// Services
import { NavigationService } from "./services/navigation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Yet Another News App for Assessment 2';

  constructor(private nav: NavigationService) { }

  goToSettings() {
    this.nav.goToSettings()
  }

}
