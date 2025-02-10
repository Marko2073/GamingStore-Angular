import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.css'
})
export class BuilderComponent {
  components: any ;
  temp: any;

  response: any = [];
  AddedComponents: any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.components= localStorage.getItem('configuration');
    this.components=JSON.parse(this.components);
    for(var key in this.components){
      if(this.components[key]!=''){
        const url = `http://localhost:5083/api/products?ModelVersionId=${this.components[key]}`;

        this.getData(url).subscribe(response => {
          this.AddedComponents[response[0].categoryName]=response[0];
        }, error => {
          console.error('Greška u zahtevima', error);
        });
      }
    }
    console.log(this.AddedComponents);


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
  IzbrisiIzConfiguration(key: string){
    this.temp = localStorage.getItem('configuration');
    this.temp=JSON.parse(this.temp);
    this.temp[key]='';

    localStorage.setItem('configuration', JSON.stringify(this.temp));
    location.reload();

  }


}
