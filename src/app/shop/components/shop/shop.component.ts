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
  Specifications: any[] = [];
  isCategoryOpen: boolean = false;
  CategorySpecifications: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.loadSpecifications();
    this.loadCategoySpecifications();
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

  private loadSpecifications(): void {
    this.http.get<any[]>('http://localhost:5083/api/specifications').subscribe(
      (specifications) => {
        this.Specifications = specifications;
        console.log('Specifications:', this.Specifications);
        this.transformSpecifications();


      },
      (error) => console.error('Error loading specifications', error)
    );
  }
  private loadCategoySpecifications(): void {
    this.http.get<any[]>('http://localhost:5083/api/categoryspecifications').subscribe(
      (catspec) => {
        this.CategorySpecifications = catspec;
        console.log('CategorySpecifications:', this.CategorySpecifications);
      });
  }
  private transformSpecifications(): void {
    const groupedSpecifications: any[] = [];
    const specMap = new Map<number, any>();

    this.Specifications.forEach(spec => {
      spec.children = [];
      spec.isOpen = false; // Dodajemo isOpen svojstvo
      specMap.set(spec.id, spec);
    });

    this.Specifications.forEach(spec => {
      if (spec.parentId === null) {
        groupedSpecifications.push(spec);
      } else {
        const parent = specMap.get(spec.parentId);
        if (parent) {
          parent.children.push(spec);
        }
      }
    });

    this.Specifications = groupedSpecifications;
    console.log('Transformed Specifications:', this.Specifications);
  }

// Varijabla za praćenje stanja kategorija


// Metoda za otvaranje jednog accordion-a dok ostali zatvaramo
  public toggleAccordion(parentSpec: any): void {
    this.isCategoryOpen = false; // Zatvaramo kategorije
    this.Specifications.forEach(spec => {
      spec.isOpen = spec === parentSpec ? !spec.isOpen : false;
    });
  }

// Metoda za otvaranje/ zatvaranje kategorija
  public toggleCategory(): void {
    this.isCategoryOpen = !this.isCategoryOpen;
    // Kada otvorimo kategorije, zatvorimo sve ostale accordeone
    if (this.isCategoryOpen) {
      this.Specifications.forEach(spec => spec.isOpen = false);
    }
  }

  public toggleArrow(id: any): void {
    if (id === 'category') {
      this.isCategoryOpen = !this.isCategoryOpen;
    } else {
      const spec = this.Specifications.find(spec => spec.id === id);
      if (spec) {
        spec.isOpen = !spec.isOpen;
      }
    }
  }




}
