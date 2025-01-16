import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements  OnInit{

  tableName: string | null = null;
  response: any = [];
  keys: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.tableName = "Users";

    const url = `http://localhost:5083/api/users`;
    this.getData(url).subscribe(response => {
      this.response = response;
      console.log(this.response);

    }, error => {
      console.error('Greška u zahtevima', error);
    });

    this.keys=['id', 'firstName', 'lastName', 'email', 'city', 'address', 'phone', 'path']

  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }


}
