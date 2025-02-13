import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  private jsonUrl = 'http://localhost:5175/api/models/';

  constructor(private http: HttpClient) {}

  getModels(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}
