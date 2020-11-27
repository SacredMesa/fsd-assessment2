import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { News } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class NewsarticlesDatabase extends Dexie {

  news: Dexie.Table<News, any>;

  constructor() {
    super('newsDB')

    this.version(1).stores({
      news: "++id, timestamp, source, author, title, description, url, image, published, content"
    })

    this.news = this.table('news')
  }

  async saveNews(key: News): Promise<any> {
    console.log('data entering newsdb: ', key)
    return await this.news.add(key)
    .catch(e => {
      console.log('sad face ', e)
    })
  }

}