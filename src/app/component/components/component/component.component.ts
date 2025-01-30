import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";



@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrl: './component.component.css'
})
export class ComponentComponent {
  response: any = [];
  catId: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }


  ngOnInit(): void {

    this.catId = this.route.snapshot.paramMap.get('category');
    console.log(this.catId);


    const url = `http://localhost:5083/api/products?categoryId=${this.catId}`;
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
