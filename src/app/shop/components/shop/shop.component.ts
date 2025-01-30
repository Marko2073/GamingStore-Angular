import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  response: any = [];
  Category: string = '';
  Categories: any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.Category = params['category'];
        console.log('Kategorija:', this.Category);
        const url = this.Category ?
          `http://localhost:5083/api/products/?CategoryName=${this.Category}` :
          `http://localhost:5083/api/products`; // Ovo je URL za sve proizvode
        return this.getData(url);
      })
    ).subscribe(response => {
      this.response = response;
      console.log(this.response);
    }, error => {
      console.error('Greška u zahtevima', error);
    });

    if(!this.Category){
      this.http.get('http://localhost:5083/api/categories').subscribe((response: any) => {
        this.Categories = response.filter((category: any) => category.parentId != null);
        console.log(this.Categories);
      });
    }
  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  isThreeColumns: boolean = true;

  // Ova funkcija menja raspored prikaza na osnovu parametra
  toggleLayout(isThreeColumns: boolean) {
    this.isThreeColumns = isThreeColumns;
  }
}
