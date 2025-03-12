import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string="";
  IsLoggedIn: boolean = false;

  private jwtHelper = new JwtHelperService();
  private decodedToken: any;





  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }
  onSubmit() {

    const formData = this.loginForm.value;
    const apiUrl = 'http://localhost:5083/api/auth';

    this.http.post(apiUrl, formData).subscribe(
      (response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);
        console.log(token);
        this.decodedToken = this.jwtHelper.decodeToken(token);
        this.IsLoggedIn = true;

        this.router.navigate(['/shop']);


      },
      (error) => {
        if (error.status === 401) {
          this.loginError = 'Neispravna šifra ili email.';
        } else {
          this.loginError = 'Greška prilikom logovanja.';
        }
      }
    );

  }
}
