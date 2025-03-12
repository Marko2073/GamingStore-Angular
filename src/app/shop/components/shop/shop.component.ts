import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import {BrandsService} from "../../buisness-logic/api/brands.service";
import {ModelsService} from "../../buisness-logic/api/models.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
  response: any[] = [];
  brands: any[] = [];
  models: any[] = [];
  Category: string = '';
  Categories: any[] = [];
  isThreeColumns: boolean = true;
  cart:any[]= [];
  showModal: boolean = false;
  Specifications: any[] = [];
  isCategoryOpen: boolean = false;
  isBrandOpen: boolean = false;
  isModelOpen: boolean = false;
  CategorySpecifications: any[] = [];
  filetrSpecificationsParent: any[] = [];
  allFilters: Filter[] = [];
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private brandsService: BrandsService,
    private modelsService: ModelsService
  ) {}



  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.loadSpecifications();

    forkJoin({
      categories: this.http.get<any[]>('http://localhost:5083/api/categories'),
      specifications: this.http.get<any[]>('http://localhost:5083/api/specifications'),
      categorySpecifications: this.http.get<any[]>('http://localhost:5083/api/categoryspecifications'),
      brands: this.brandsService.getBrands(),
      models: this.modelsService.getModels()
    }).subscribe(({ categories, specifications, categorySpecifications, brands, models }) => {
      this.Categories = categories.filter(category => category.parentId != null);
      this.Specifications = specifications;
      this.CategorySpecifications = categorySpecifications;
      this.brands = brands;
      this.models = models;

      this.filterSpecificationsByCategory();
      this.transformSpecifications();

      this.allFilters = [];

      if (!this.Category) {
        this.allFilters.push({
          id: 1,
          name: 'Category',
          children: this.Categories.map(category => ({
            id: category.id,
            name: category.name,
            isChecked: false
          })),
          isOpen: false
        });
      }
      if(this.brands.length > 0) {
        this.allFilters.push({
          id: 2,
          name: 'Brand',
          children: this.brands.map(brand => ({
            id: brand.id,
            name: brand.name,
            isChecked: false
          })),
          isOpen: false
        });
      }
      if(this.models.length > 0) {
        this.allFilters.push({
          id: 3,
          name: 'Model',
          children: this.models.map(model => ({
            id: model.id,
            name: model.name,
            isChecked: false
          })),
          isOpen: false
        });
      }
      this.allFilters.push(...this.Specifications.map(spec => ({
        id: spec.id,
        name: spec.name,
        children: spec.children.map((child: any) => ({
          id: child.id,
          name: child.name,
          isChecked: false // Dodaj isChecked ovde
        })),
        isOpen: false
      })));
      this.allFilters[0].isOpen = true;
      console.log(this.allFilters);


    }, error => {
      console.error('Error loading data', error);
    });




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
        this.transformSpecifications();


      },
      (error) => console.error('Error loading specifications', error)
    );
  }
  private loadCategoySpecifications(): void {
    this.http.get<any[]>('http://localhost:5083/api/categoryspecifications').subscribe(
      (catspec) => {
        this.CategorySpecifications = catspec;

        this.filterSpecificationsByCategory(); // Filtriramo specifikacije po kategoriji

        // Transformišemo specifikacije **tek nakon što imamo filtrirane podatke**
        this.transformSpecifications();
      },
      (error) => console.error('Error loading category specifications', error)
    );
  }


  private filterSpecificationsByCategory(): void {
    if (this.Category != '') {
      this.filetrSpecificationsParent = this.CategorySpecifications
        .filter(element => element.categoryName == this.Category)
        .map(element => element.specificationName); // Uzimamo samo specificationName

    }
  }


  private transformSpecifications(): void {
    if (!this.Specifications.length || !this.CategorySpecifications.length) {
      return;
    }

    var groupedSpecifications: any[] = [];
    const specMap = new Map<number, any>();

    this.Specifications.forEach(spec => {
      spec.children = [];
      spec.isOpen = false;
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

    if (this.filetrSpecificationsParent.length > 0) {
      groupedSpecifications = groupedSpecifications.filter(spec =>
        this.filetrSpecificationsParent.includes(spec.name)
      );
    }

    this.Specifications = groupedSpecifications.filter(spec => spec.children.length > 0);
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

export interface ChildFilter {
  id: number;
  name: string;
  isChecked: boolean;
}

export interface Filter {
  children: ChildFilter[];
  id: number;
  isOpen: boolean;
  name: string;
}
