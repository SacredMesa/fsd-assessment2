import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Country } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class CountrylistDatabase extends Dexie {

  country: Dexie.Table<Country, string>;

  constructor() {
    super('countryDB')

    this.version(1).stores({
      country: "name, alpha2code, flag"
    })

    this.country = this.table('country')
  }

  async saveCountries(key: Country): Promise<any> {
    console.log('data entering countrydb: ', key)
    return await this.country.add(key)
  }

}
