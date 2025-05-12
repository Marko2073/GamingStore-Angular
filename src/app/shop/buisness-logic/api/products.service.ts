import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private jsonUrl = 'http://localhost:5083/api/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number): Observable<any> {
    const url = `${this.jsonUrl}?page=${page}`; // Construct URL with page parameter
    return this.http.get<any>(url);
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.jsonUrl+"?ItemsPerPage=1000");
  }

  getFilteredProducts(filters: any, page: number, itemsPerPage: number): Observable<any> {
    let url = `${this.jsonUrl}?page=${page}&itemsPerPage=${itemsPerPage}&`;
    console.log(filters.brandId.length);

    if (filters.brandId.length !== 0) {
      filters.brandId.forEach((element: any) => {
        url += `brandId=${element}&`;
      });

    }
    if (filters.specificationIds.length !== 0) {
      filters.specificationIds.forEach((element: any) => {
        url += `specificationIds=${element}&`;
      });
    }

    return this.http.get<any>(url);
  }


  getOneProduct(id: string): Observable<any> {
    const url = `${this.jsonUrl}/${id}`; // Construct URL with page parameter
    return this.http.get<any>(url);
  }




}
