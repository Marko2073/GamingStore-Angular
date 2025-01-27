import { Component } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private jwtHelper = new JwtHelperService();
  private decodedToken: any;
  token: string | null = localStorage.getItem('token');

  constructor(private http: HttpClient, private router: Router) {
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
  isAdmin(): boolean {
    if (this.token) { // Provera da li token postoji
      this.decodedToken = this.jwtHelper.decodeToken(this.token);
      console.log(this.decodedToken);
      return this.isLoggedIn() && this.decodedToken?.RoleId == 10;
    }
    return false; // Ako token ne postoji, korisnik nije admin
  }
  Logout() {
    // Endpoint for logout API
    const apiUrl = 'http://localhost:5083/api/auth';

    // Prepare headers with token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    // Send DELETE request with headers
    this.http.delete(apiUrl, { headers }).subscribe(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error logging out:', error);

      }
    );
  }

}
