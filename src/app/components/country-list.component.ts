import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

//Services & DBs
import { CountrylistDatabase } from "../services/countrylist.database";

// interfaces
import { Country } from "../interfaces/models";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countryData: Country[] = [];

  constructor(private http: HttpClient, private countrydb: CountrylistDatabase) { }

  async ngOnInit() {

    await this.countrydb.country.each(key => {
      this.countryData.push(key)
    })
    console.log("Has it been stored beforee??? ", this.countryData)

    const url = `https://restcountries.eu/rest/v2/all`

    if (this.countryData.length == 0) {
      this.http
        .get<any>(url)
        .toPromise()
        .then(res => {
          const results = res as any[]
          this.countryData = results.map(r => {
            let obj = {
              name: r['name'],
              alpha2code: r['alpha2Code'],
              flag: r['flag']
            } as Country
            this.countrydb.saveCountries(obj)
            return obj
          })
          console.log('pulled from API!! ', this.countryData)
        })
    } else {
      console.log('We have stuff in our countryData variable?')
    }

  }

}
