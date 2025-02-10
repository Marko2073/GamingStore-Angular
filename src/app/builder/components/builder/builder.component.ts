import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.css'
})
export class BuilderComponent {

  response: any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {


    const url = `http://localhost:5083/api/categories`;
    this.getData(url).subscribe(response => {
      this.response = response.filter((item: any) => item.parentId != null);
      console.log(this.response);

    }, error => {
      console.error('Greška u zahtevima', error);
    });


  }
  isLoggedIn() {
    return localStorage.getItem('token');
  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }


}
