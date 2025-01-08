import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrl: './models.component.css'
})
export class ModelsComponent implements  OnInit{
  tableName: string | null = null;
  response: any = [];
  keys: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.tableName = "Models";

    const url = `http://localhost:5083/api/models`;
    this.getData(url).subscribe(response => {
      this.response = response;
      console.log(this.response[0]['categoryName']);



    }, error => {
      console.error('Greška u zahtevima', error);
    });

    this.keys=['id','name','brandName', 'categoryName']

  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }


}
