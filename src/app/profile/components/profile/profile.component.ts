import { Component } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  };

  private jwtHelper = new JwtHelperService();
  private decodedToken: any;
  token : any='';
  response : any={};
  id : any;
  carts : any={};
  configurations : any={};
  profilePicForm = this.formBuilder.group({});
  selectedFile: File | null = null;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  UpdateUser() {
    console.log(this.user);

    const formData = new FormData();
    formData.append('FirstName', this.user.firstName);
    formData.append('LastName', this.user.lastName);
    formData.append('Email', this.user.email);
    formData.append('City', this.user.city);
    formData.append('Address', this.user.address);
    formData.append('Phone', this.user.phone);
    formData.append('RoleId', '10');
    console.log(formData.get('FirstName'));
    console.log(formData.get('LastName'));
    console.log(formData.get('Email'));
    console.log(formData.get('City'));
    console.log(formData.get('Address'));
    console.log(formData.get('Phone'));
    console.log(formData.get('RoleId'));
    // PUT zahtev sa formData

    this.http.put(`http://localhost:5083/api/users/${this.response.id}`, formData).subscribe({
      next: (res:any) => {
        this.getData(`http://localhost:5083/api/users/${this.response.id}`).subscribe((data) => {
          this.response = data;
        });
      },
      error: (err) => {
        console.error('Greška pri update-u korisnika:', err);
      }
    });

  }

  updateProfilePicture() {
    const formData = new FormData();

    // Dodaj sliku ako je izabrana
    if (this.selectedFile) {
      console.log("uspeo")
      formData.append('Path', this.selectedFile);
    }

    // Dodaj sve ostale podatke koje backend očekuje
    formData.append('FirstName', this.response.firstName);
    formData.append('LastName', this.response.lastName);
    formData.append('Email', this.response.email);
    formData.append('City', this.response.city);
    formData.append('Address', this.response.address);
    formData.append('Phone', this.response.phone);
    formData.append('RoleId', '10');

    console.log(formData.get('Path'));
    console.log(formData.get('FirstName'));
    console.log(formData.get('LastName'));
    console.log(formData.get('Email'));
    console.log(formData.get('City'));
    console.log(formData.get('Address'));
    console.log(formData.get('Phone'));
    console.log(formData.get('RoleId'));

    // PUT zahtev sa formData (kao što si radio ranije)
    this.http.put(`http://localhost:5083/api/users/${this.response.id}`, formData).subscribe({
      next: (res:any) => {
        this.getData(`http://localhost:5083/api/users/${this.response.id}`).subscribe((data) => {
          this.response = data;
        });
      },
      error: (err) => {
        console.error('Greška pri update-u slike:', err);
      }
    });
  }


  ngOnInit(): void {

    this.token=localStorage.getItem('token');

    this.decodedToken = this.jwtHelper.decodeToken(this.token);
    console.log(this.decodedToken)
    this.id= this.decodedToken.Id;
    const url = `http://localhost:5083/api/users/${this.id}`;
    this.getData(url).subscribe(response => {
      this.response = response;
      this.user = {
        firstName: this.response.firstName,
        lastName: this.response.lastName,
        email: this.response.email,
        phone: this.response.phone,
        address: this.response.address,
        city: this.response.city
      };
      console.log(this.response);

    }, error => {
      console.error('Greška u zahtevima', error);
    });

    const url1 = `http://localhost:5083/api/carts`;
    this.getData(url1).subscribe(response => {
      this.carts = response.map((cart: any) => ({
        ...cart,
        isCollapsed: true // Dodaj isCollapsed svojstvo
      }));

      console.log(this.carts);
    }, error => {
      console.error('Greška u zahtevima', error);
    });
    const url2 = `http://localhost:5083/api/configurations`;
    this.getData(url2).subscribe(response => {
      this.configurations = response.map((config: any) => ({
        ...config,
        isCollapsed: true // Dodaj isCollapsed svojstvo
      }));
      console.log(this.configurations);
    }, error => {
      console.error('Greška u zahtevima', error);
    });





  }
  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }


  protected readonly formatDate = formatDate;
}
