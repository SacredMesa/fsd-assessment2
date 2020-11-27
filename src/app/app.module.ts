import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// Components
import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { CountryListComponent } from './components/country-list.component';
import { SettingsComponent } from './components/settings.component';
import { NewsListComponent } from './components/news-list.component';

//Services & DBs
import { NavigationService } from "./services/navigation.service";
import { ApiKeyDatabase } from "./services/apikey.database";
import { CountrylistDatabase } from "./services/countrylist.database";
import { NewsarticlesDatabase } from "./services/newsarticles.database";

// Lottie Animations
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

const ROUTES: Routes = [
  { path: '', component: MainComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'countries', component: CountryListComponent },
  { path: 'news/:countrycode', component: NewsListComponent },
  // { path: 'search/:medium/:q', component: ResultsComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    SettingsComponent,
    NewsListComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({
      player: playerFactory
    })
  ],
  providers: [
    NavigationService,
    ApiKeyDatabase,
    CountrylistDatabase,
    NewsarticlesDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
