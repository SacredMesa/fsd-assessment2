import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Country } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class CountrylistDatabase extends Dexie {

  private country: Dexie.Table<Country, string>;

  constructor() {
    super('countryDB')

    this.version(1).stores({
      country: "country"
    })

    this.country = this.table('country')
  }

}
