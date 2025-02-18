import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  response: any[] = [];
  Category: string = '';
  Categories: any[] = [];
  isThreeColumns: boolean = true;
  cart:any[]= [];
  showModal: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  private loadCategories(): void {
    this.http.get<any[]>('http://localhost:5083/api/categories').subscribe(
      (categories) => {
        this.Categories = categories.filter((category) => category.parentId != null);
      },
      (error) => console.error('Error loading categories', error)
    );
  }

  private loadProducts(): void {
    this.route.params.pipe(
      switchMap((params) => {
        this.Category = params['category'];

        if (this.Category) {
          return this.http.get<any[]>('http://localhost:5083/api/categories').pipe(
            switchMap((categories) => {
              this.Categories = categories.filter((category) => category.name === this.Category);

              if (this.Categories.length === 0) {
                this.router.navigate(['**']);
                return new Observable<any[]>();
              }

              return this.getData(`http://localhost:5083/api/products/?CategoryName=${this.Category}`);
            })
          );
        }

        return this.getData('http://localhost:5083/api/products');
      }),
      catchError((error) => {
        console.error('Error fetching products', error);
        return new Observable<any[]>();
      })
    ).subscribe((response) => {
      this.response = response;
    });
  }

  private getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  toggleLayout(isThreeColumns: boolean): void {
    this.isThreeColumns = isThreeColumns;
  }

}
