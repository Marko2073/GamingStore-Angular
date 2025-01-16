import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-specifications',
  templateUrl: './specifications.component.html',
  styleUrl: './specifications.component.css'
})
export class SpecificationsComponent implements  OnInit{

  tableName: string | null = null;
  response: any = [];
  keys: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.tableName = "Specifications";

    const url = `http://localhost:5083/api/specifications`;
    this.getData(url).subscribe(response => {
      this.response = response;
      console.log(this.response);

    }, error => {
      console.error('Greška u zahtevima', error);
    });
    this.keys=['id', 'name', 'parentName']
  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }


}
