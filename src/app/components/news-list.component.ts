import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";

// Interfaces
import { News } from "../interfaces/models";

//Services & DBs
import { ApiKeyDatabase } from "../services/apikey.database";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  apiKey: string = ''
  countryCode: string = ''

  newsResults: News[] = []

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private apidb: ApiKeyDatabase) { }

  async ngOnInit() {

    await this.apidb.api.get(1)
      .then(key => { this.apiKey = key.api })
    console.log('searching with this key: ', this.apiKey)

    this.countryCode = this.activatedRoute.snapshot.params['countrycode'];

    const url = `https://newsapi.org/v2/top-headlines`
    let params = (new HttpParams())
      .set('country', this.countryCode)
      .set('apiKey', this.apiKey)

    this.http
      .get<any>(url, { params: params })
      .toPromise()
      .then(res => {
        const results = res['articles'] as any[]
        this.newsResults = results.map(r => {
          return {
            source: r['source'].name,
            author: r['author'],
            title: r['title'],
            description: r['description'],
            url: r['url'],
            image: r['urlToImage'],
            published: r['publishedAt'],
            content: r['content'],
          } as News
        })
        console.log(this.newsResults)
      })
  }

}