import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css'
})
export class PricesComponent implements  OnInit{

  tableName: string | null = null;
  response: any = [];
  keys: string[] = [];
  InsertKeys: string[] = [];
  UpdateKeys: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.tableName = "Prices";

    const url = `http://localhost:5083/api/prices`;
    this.getData(url).subscribe(response => {
      this.response = response;
      console.log(this.response);

    }, error => {
      console.error('Greška u zahtevima', error);
    });
    this.keys=['id', 'modelVersionName', 'value', 'dateFrom', 'dateTo']
    this.InsertKeys=['modelVersionName', 'value', 'dateFrom', 'dateTo']
    this.UpdateKeys=['id', 'modelVersionName', 'value', 'dateFrom', 'dateTo']
  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }


}
