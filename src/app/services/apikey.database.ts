import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Api } from '../interfaces/models';

// Services
import { NavigationService } from "../services/navigation.service";

@Injectable({
  providedIn: 'root'
})
export class ApiKeyDatabase extends Dexie {

  api: Dexie.Table<Api>;

  constructor(private nav: NavigationService) {
    super('apiDB')

    this.version(1).stores({
      api: "++id, api"
    })

    this.api = this.table('api')
  }

  async saveApi(key: Api): Promise<any> {
    console.log('data entering apidb: ', key)

    const resultCount = await this.api
      .count()

    if (resultCount <= 0) {
      return await this.api.add(key)
    }
  }

  async checkContent(): Promise<any> {
    const have = await this.api.count()
    console.log('The number of items in apidb: ', have)
    if (have > 0) {
      console.log('returning true')
      return this.nav.goToCountry()
    } else {
      console.log('returning false')
      return this.nav.goToSettings()
    }
  }
}
