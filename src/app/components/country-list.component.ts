import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

// interfaces
import { Country } from "../interfaces/models";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countryData: Country[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    const url = `https://restcountries.eu/rest/v2/all`

    this.http
      .get<any>(url)
      .toPromise()
      .then(res => {
        const results = res as any[]
        this.countryData = results.map(r => {
          return {
            name: r['name'],
            alpha2code: r['alpha2Code'],
            flag: r['flag']
          } as Country
        })
        console.log(this.countryData)
      })

  }

}
