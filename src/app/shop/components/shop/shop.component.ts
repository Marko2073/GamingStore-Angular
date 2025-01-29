import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  response: any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {


    const url = `http://localhost:5083/api/products`;
    this.getData(url).subscribe(response => {
      this.response = response;
      console.log(this.response);

    }, error => {
      console.error('Greška u zahtevima', error);
    });


  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }





}
