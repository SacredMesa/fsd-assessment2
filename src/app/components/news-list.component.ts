import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";

// Interfaces
import { News } from "../interfaces/models";

//Services & DBs
import { NavigationService } from "../services/navigation.service";
import { ApiKeyDatabase } from "../services/apikey.database";
import { NewsarticlesDatabase } from "../services/newsarticles.database";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  apiKey: string = ''
  countryCode: string = ''

  newsResults: News[] = []

  timestamp: number = new Date().getTime()
  timeCheck: number = new Date().getTime() + 300000;

  noResults: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private apidb: ApiKeyDatabase, private nav: NavigationService, private newsdb: NewsarticlesDatabase) { }

  async ngOnInit() {

    await this.apidb.api.get(1)
      .then(key => { this.apiKey = key.api })
    console.log('searching with this key: ', this.apiKey)

    // await this.newsdb.news.where('country').equals(this.countryCode).each(key => {
    //   this.newsResults.push(key)
    // })
    console.log("Has we gotten news before??? ", this.newsResults)

    this.countryCode = this.activatedRoute.snapshot.params['countrycode'];

    const url = `https://newsapi.org/v2/top-headlines`
    let params = (new HttpParams())
      .set('country', this.countryCode)
      .set('apiKey', this.apiKey)
      .set('pageSize', '30')

    console.log('help me I wanna die', this.count())

// @ts-ignore
    if (this.count() == 0 || this.newsdb.news.where('timestamp').above(this.timeCheck)) {
      this.http
        .get<any>(url, { params: params })
        .toPromise()
        .then(res => {
          const results = res['articles'] as any[]
          this.newsResults = results.map(r => {
            let obj = {
              // id: this.countryCode,
              source: r['source'].name,
              author: r['author'],
              title: r['title'],
              description: r['description'],
              url: r['url'],
              image: r['urlToImage'],
              published: r['publishedAt'],
              content: r['content'],
              country: this.countryCode,
              timestamp: this.timestamp
            } as News
            this.newsdb.saveNews(obj)
            return obj
          })
          console.log(this.newsResults)
        })
    }

    if (this.newsResults.length == 0) {
      this.noResults = false
    }
  }

  async count() {
    return await this.newsdb.news.count()
    .then(c => {return c})
  }

  goToCountries() {
    this.nav.goToCountry()
  }

}