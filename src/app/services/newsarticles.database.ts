import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { News } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class NewsarticlesDatabase extends Dexie {

  private news: Dexie.Table<News, string>;

  constructor() {
    super('newsDB')

    this.version(1).stores({
      news: "news"
    })

    this.news = this.table('news')
  }

}