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

  getFilteredProducts(filters : any): Observable<any> {
    if(filters.brandId == 0 && filters.modelId == 0 && filters.specifications.length == 0){
      return this.getAllProducts();
    }
    else {
      let url = this.jsonUrl + "?";
      if(filters.brandId != 0){
        url += "brandId=" + filters.brandId + "&";
      }
      if(filters.modelId != 0){
        url += "modelId=" + filters.modelId + "&";
      }
      if(filters.specifications.length != 0){
        filters.specifications.forEach((element: any) => {
          url += "specificationIds=" + element + "&";
        });
      }
      return this.http.get<any>(url);
    }
  }

  getOneProduct(id: string): Observable<any> {
    const url = `${this.jsonUrl}/${id}`; // Construct URL with page parameter
    return this.http.get<any>(url);
  }




}
