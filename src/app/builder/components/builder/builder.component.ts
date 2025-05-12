import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.css'
})
export class BuilderComponent {
  components: any ;
  temp: any;
  NumOfRams: any=1;
  niz: any = [];
  SelectedStorages: any = [];
  nizBrisanje: any = [];
  formData: any = {};
  ComponentsForm: any = [];
  storageComponents: any = [];

  response: any = [];
  AddedComponents: any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.components= localStorage.getItem('configuration');
    this.components=JSON.parse(this.components);
    console.log(this.components);
    for(var key in this.components){
      if(this.components[key]!=''){
        if(key=="Ram"){
          if(typeof this.components[key] === 'string') {
            this.niz = this.components[key].split(",");
            console.log(this.niz);
            this.NumOfRams = this.niz.length;
            this.components[key] = this.components[key].split(",")[0];



          }
          else {
            this.components[key] = this.components[key];
          }


        }
        else if(key=="Storage"){
          if(typeof this.components[key] === 'string') {
            this.niz = this.components[key].split(",");

            this.components[key] = this.components[key].split(",")[0];
            for(var i=1; i<this.niz.length; i++){
              const url = `http://localhost:5083/api/products?ModelVersionId=${this.niz[i]}`;
              this.getData(url).subscribe(response => {
                this.SelectedStorages.push(response[0]);
                console.log(this.SelectedStorages);
              }, error => {
                console.error('Greška u zahtevima', error);
              });

            }

          }
          else {
            this.components[key] = this.components[key];
          }
        }
        else {
          this.components[key] = this.components[key];
        }

        const url = `http://localhost:5083/api/products?ModelVersionId=${this.components[key]}`;


        this.getData(url).subscribe(response => {
          this.AddedComponents[response[0].categoryName]=response[0];
          console.log(this.AddedComponents);
        }, error => {
          console.error('Greška u zahtevima', error);
        });
      }
    }
    console.log(this.AddedComponents);


    const url = `http://localhost:5083/api/categories`;
    this.getData(url).subscribe(response => {
      this.response = response.filter((item: any) => item.parentId != null);
      console.log(this.response);

    }, error => {
      console.error('Greška u zahtevima', error);
    });



  }
  isLoggedIn() {
    return localStorage.getItem('token');
  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
  postData(url: string, data: any): Observable<any> {
    return this.http.post<any>(url, data);
  }
  IzbrisiIzConfiguration(key: string){
    this.temp = localStorage.getItem('configuration');
    this.temp=JSON.parse(this.temp);
    this.temp[key]='';

    localStorage.setItem('configuration', JSON.stringify(this.temp));
    location.reload();

  }
  IzbrisiIzConfigurationAdditional = (key: string, id:number) => {

    this.temp = localStorage.getItem('configuration');
    this.temp = JSON.parse(this.temp);


    this.nizBrisanje = this.temp['Storage'].split(",");

    for (let i = this.nizBrisanje.length - 1; i >= 0; i--) {
      if (this.nizBrisanje[i] == id) {
        this.nizBrisanje.splice(i, 1);
        break;
      }
    }
    this.temp['Storage'] = this.nizBrisanje.join(",");
    localStorage.setItem('configuration', JSON.stringify(this.temp));
    location.reload();
  }
  isConfigurationComplete(){
    this.temp = localStorage.getItem('configuration');
    this.temp=JSON.parse(this.temp);
    for(var key in this.temp){
      if(this.temp[key]==''){
        return false;
      }
    }
    return true;
  }
  OrderConfiguration(){
    this.temp = localStorage.getItem('configuration');
    this.temp=JSON.parse(this.temp);
    var ram = this.temp['Ram'].split(",")[0];
    var ramquantity = this.temp['Ram'].split(",");

    var storage = this.temp['Storage'].split(",");
    for (let i = 0; i < storage.length; i++) {
      if(this.storageComponents.length==0){
        this.storageComponents.push({ModelVersionId:storage[i], quantity:1});
      }
      else {
        for (let j = 0; j < this.storageComponents.length; j++) {
          if (this.storageComponents[j].ModelVersionId == storage[i]) {
            this.storageComponents[j].quantity++;
            break;
          } else if (j == this.storageComponents.length - 1) {
            this.storageComponents.push({ModelVersionId: storage[i], quantity: 1});
            break;
          }
        }}

    }
    this.formData['Components'] = this.formData['Components'] || []; // Ako nije definisano, postavi na prazan niz

    this.formData['Components'].push({ ModelversionId: this.temp['Processor'], quantity: 1 });
    this.formData['Components'].push({ ModelversionId: this.temp['Motherboard'], quantity: 1 });
    this.formData['Components'].push({ ModelversionId: this.temp['Graphics Card'], quantity: 1 });


    this.formData['Components'].push({ ModelversionId: ram, quantity: ramquantity.length });

    this.formData['Components'].push({ ModelversionId: this.temp['Case'], quantity: 1 });
    this.formData['Components'].push({ ModelversionId: this.temp['Power Supply'], quantity: 1 });


    if (this.storageComponents.length > 0) {
      this.formData['Components'].push(...this.storageComponents); // Dodaj sve storage komponente
    }

    console.log(this.formData);

    this.postData('http://localhost:5083/api/configurations', this.formData).subscribe(response => {

      console.log(response);
      localStorage.setItem('configuration', JSON.stringify([]));
      this.router.navigate(['/profile']);
    });







  }


}
