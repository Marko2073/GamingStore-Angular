import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements  OnInit{
  tableName: string | null = null;
  response: any = [];
  keys: string[] = [];
  InsertKeys: string[] = [];
  UpdateKeys: string[] = [];
  data: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.tableName = "Categories";

    const url = `http://localhost:5083/api/categories`;
    this.getData(url).subscribe(response => {
      this.response = response;
      console.log(this.response);



    }, error => {
      console.error('Greška u zahtevima', error);
    });

    this.keys=['id','name','parentName']
    this.InsertKeys = ['name','parentName'];
    this.UpdateKeys = ['id','name','parentName'];

    this.getData('http://localhost:5083/api/categories').subscribe(response => {
      this.data['parent'] = response.filter((category: any) => category.parentName === null);
    });

  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

}
