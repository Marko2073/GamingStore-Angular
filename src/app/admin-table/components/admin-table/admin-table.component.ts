import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {

  tableName: string | null = null;
  response: any = [];
  keys: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tableName = params['table'];

      if (this.tableName) {
        const url = `http://localhost:5083/api/${this.tableName}`;
        this.getData(url).subscribe(response => {
          this.response = response;

          // Sortiranje ključeva tako da 'id' bude prvi
          this.keys = this.sortKeys(Object.keys(this.response[0]));

        }, error => {
          console.error('Greška u zahtevima', error);
        });
      }
    });
  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url); // Možete dodati i druge konfiguracije, ako su potrebne
  }

  sortKeys(keys: string[]): string[] {
    // Zadrži ključ 'id' i sve koje se ne završavaju sa 'Id', ostalo preskoči
    const filteredKeys = keys.filter(key => key === 'id' || !key.endsWith('Id'));

    // Ukloni 'id' iz niza, ako postoji, kako bi se mogao staviti na prvo mesto
    const idIndex = filteredKeys.indexOf('id');
    if (idIndex > -1) {
      filteredKeys.splice(idIndex, 1); // Ukloni 'id' sa trenutne pozicije
    }

    // Sortiraj ostale ključeve i dodaj 'id' na početak
    return ['id', ...filteredKeys.sort()];
  }
}
