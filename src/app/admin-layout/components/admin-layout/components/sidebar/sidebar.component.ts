import {Component, OnInit, Renderer2} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  public apiUrl = ' http://localhost:5083/api/tables';
  public niz: any = [];
  public nizLogs: any = [];
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl);

  }
  ngOnInit(): void {
    this.getPosts().subscribe((data: any[]) => {


      data.forEach((item) => {
        if (typeof item.name === 'string' && item.name.endsWith('Logs')) {
          this.nizLogs.push(item); // Dodaj u nizLogs
        } else {
          if(item.name != 'Carts ' && item.name != 'Configurations' && item.name != 'CartItems' && item.name!='Components'){
            this.niz.push(item); // Dodaj u niz
          }
        }
      });
    });
  }




}
