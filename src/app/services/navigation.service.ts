import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToSettings() {
    this.router.navigate(['settings']);
  }

  goToCountry() {
    this.router.navigate(['countries']);
  }

  goToNews() {
    this.router.navigate(['/news']);
  }
}

