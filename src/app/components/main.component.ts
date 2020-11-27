import { Component, OnInit, NgZone } from '@angular/core';

//Services & DBs
import { NavigationService } from "../services/navigation.service";
import { ApiKeyDatabase } from "../services/apikey.database";

// Misc
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  options: AnimationOptions = {
    path: './assets/newsanim.json'
  }

  constructor(private nav: NavigationService, private ngZone: NgZone, private apidb: ApiKeyDatabase) { }

  ngOnInit(): void {
  }

  onLoopComplete() {
    this.ngZone.run(() => {
      if (this.apidb.checkContent()) {
        this.nav.goToCountry()
      } else {
        this.nav.goToSettings()
      }
    })
  }
}
