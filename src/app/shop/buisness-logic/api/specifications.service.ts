import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpecificationsService {

  private jsonUrl = 'http://localhost:5175/api/specifications/';

  constructor(private http: HttpClient) {}

  getSpecifications(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}
