import {Component, OnInit, Renderer2} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public apiUrl = ' http://localhost:5083/api/tables';
  public niz: any = [];
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl);

  }
  ngOnInit(): void {

    this.getPosts().subscribe((data) => {
      this.niz = data;
    });

  }




}
