import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrl: './pictures.component.css'
})
export class PicturesComponent implements  OnInit{

  tableName: string | null = null;
  response: any = [];
  keys: string[] = [];
  InsertKeys: string[] = [];
  UpdateKeys: string[] = [];
  data: any = {};
  url:string='pictures'

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.tableName = "Pictures";

    const url = `http://localhost:5083/api/pictures`;
    this.getData(url).subscribe(response => {
      this.response = response;
      console.log(this.response);

    }, error => {
      console.error('Greška u zahtevima', error);
    });
    this.keys=['id', 'modelVersionName', 'path']
    this.InsertKeys=['modelVersionName', 'path']
    this.UpdateKeys=['id', 'modelVersionName', 'path']

    this.getData('http://localhost:5083/api/modelversions').subscribe(response => {
      this.data['modelVersion'] = response;
    });

  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }


}
