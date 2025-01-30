import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrl: './single.component.css'
})
export class SingleComponent {




  response: any = [];
  id: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');


    const url = `http://localhost:5083/api/products/${this.id}`;
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
