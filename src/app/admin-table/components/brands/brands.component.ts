import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements  OnInit{

  tableName: string | null = null;
  response: any = [];
  keys: string[] = [];
  InsertKeys: string[] = [];
  UpdateKeys: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.tableName = "Brands";

    const url = `http://localhost:5083/api/brands`;
    this.getData(url).subscribe(response => {
      this.response = response;

    }, error => {
      console.error('Greška u zahtevima', error);
    });

    this.keys=['id', 'name']
    this.InsertKeys = ['name'];
    this.UpdateKeys = ['id', 'name'];

  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }


}
