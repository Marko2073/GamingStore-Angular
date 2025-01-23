import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categoryspecifications',
  templateUrl: './categoryspecifications.component.html',
  styleUrl: './categoryspecifications.component.css'
})
export class CategoryspecificationsComponent implements  OnInit{
  tableName: string | null = null;
  response: any = [];
  keys: string[] = [];
  InsertKeys: string[] = [];
  UpdateKeys: string[] = [];
  data: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.tableName = "Category Specifications";

    const url = `http://localhost:5083/api/categoryspecifications`;
    this.getData(url).subscribe(response => {
      this.response = response;
      console.log(this.response);



    }, error => {
      console.error('Greška u zahtevima', error);
    });

    this.keys=['id','specificationName', 'categoryName']
    this.InsertKeys=['specificationName', 'categoryName']
    this.UpdateKeys=['id','specificationName', 'categoryName']

    this.getData('http://localhost:5083/api/categories').subscribe(response => {
      this.data['category'] = response.filter((category: any) => category.parentName === null);
    });

    this.getData('http://localhost:5083/api/specifications').subscribe(response => {
      this.data['specification'] = response.filter((specification: any) => specification.parentName === null);
    });

  }
  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

}

