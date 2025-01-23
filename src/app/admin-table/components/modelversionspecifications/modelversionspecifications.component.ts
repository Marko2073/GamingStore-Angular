import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modelversionspecifications',
  templateUrl: './modelversionspecifications.component.html',
  styleUrls: ['./modelversionspecifications.component.css'],
})
export class ModelversionspecificationsComponent implements OnInit {
  tableName: string | null = null;
  response: any = [];
  keys: string[] = [];
  InsertKeys: string[] = [];
  UpdateKeys: string[] = [];
  data: any = {};
  catSpec: any = [];
  url: string = 'modelversionspecifications';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.tableName = 'Model Version Specifications';
    this.keys = ['id', 'modelVersionName', 'specificationParent', 'specificationValue'];
    this.InsertKeys = ['modelVersionName', 'specificationParent', 'specificationValue'];
    this.UpdateKeys = ['id', 'modelVersionName', 'specificationParent', 'specificationValue'];

    this.getData('http://localhost:5083/api/modelversionspecifications').subscribe(
      (response) => (this.response = response),
      (error) => console.error('Error fetching model version specifications', error)
    );

    this.getData('http://localhost:5083/api/modelversions').subscribe(
      (response) => (this.data['modelVersion'] = response)
    );

    this.getData('http://localhost:5083/api/specifications').subscribe(
      (response) =>
        (this.data['specificationParent'] = response.filter((spec: any) => spec.parentName === null))
    );


  }

  handleParentChange(parentId: number): void {
    this.getData(`http://localhost:5083/api/specifications`).subscribe((response) => {
      this.data['specificationValue'] = response.filter((spec: any) => spec.parentId == parentId);

    });
  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
