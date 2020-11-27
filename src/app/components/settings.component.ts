import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Api } from "../interfaces/models";

//Services & DBs
import { NavigationService } from "../services/navigation.service";
import { ApiKeyDatabase } from "../services/apikey.database";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  apiForm: FormGroup

  apiKey: string = ''

  constructor(private fb: FormBuilder, private nav: NavigationService , private apidb: ApiKeyDatabase) { }

  ngOnInit(): void {

    this.apiForm = this.createApi()

// unhandled rejection here. Works, but ugly
    this.apidb.api.get(1)
      .then(key => {this.apiKey = key.api})
    console.log(this.apiKey)
  }

  private createApi(): FormGroup {
    return this.fb.group({
      api: this.fb.control('', [Validators.required]),
    })
  }

  async addApiKey() {
    const add: Api = {
      api: this.apiForm.get('api').value
    }
    await this.apidb.saveApi(add)

    this.nav.goToCountry()
  }
}