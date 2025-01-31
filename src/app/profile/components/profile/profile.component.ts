import { Component } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private jwtHelper = new JwtHelperService();
  private decodedToken: any;
  token : any='';
  response : any={};
  id : any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){

  }

  ngOnInit(): void {

    this.token=localStorage.getItem('token');

    this.decodedToken = this.jwtHelper.decodeToken(this.token);
    console.log(this.decodedToken)
    this.id= this.decodedToken.Id;
    const url = `http://localhost:5083/api/users/${this.id}`;
    this.getData(url).subscribe(response => {
      this.response = response;
      console.log(this.response);

    }, error => {
      console.error('Greška u zahtevima', error);
    });



  }
  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }





}
