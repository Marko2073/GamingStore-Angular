import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";



@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrl: './component.component.css'
})
export class ComponentComponent {
  response: any = [];
  catId: any;
  configuration: any ;
  product: any;
  SearchSpec: any;


  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }


  ngOnInit(): void {

    this.catId = this.route.snapshot.paramMap.get('category');
    console.log(this.catId);
    if(this.catId=="Processor"){
      this.configuration=localStorage.getItem('configuration');
      this.configuration=JSON.parse(this.configuration);
      if(this.configuration['Motherboard']==''){
        const url = `http://localhost:5083/api/products?categoryName=${this.catId}`;
        this.getData(url).subscribe(response => {
          this.response = response;
          console.log(this.response);

        }, error => {
          console.error('Greška u zahtevima', error);
        });
      }
      else {
        const url = `http://localhost:5083/api/products?ModelVersionId=${this.configuration['Motherboard']}`;
        this.getData(url).subscribe(response => {
          this.product = response;
          console.log(this.product);
          for(var spec of this.product[0].specifications){
            if(spec.parentName=="Socket"){
              const url1 = `http://localhost:5083/api/products?SpecificationIds=${spec.id}&categoryName=${this.catId}`;
              this.getData(url1).subscribe(response => {
                this.response = response;
                console.log(this.SearchSpec);
              }, error => {
                console.error('Greška u zahtevima', error);
              });

            }
          }


        }, error => {
          console.error('Greška u zahtevima', error);
        });




      }

    }
    else if(this.catId=="Motherboard"){
      this.configuration=localStorage.getItem('configuration');
      this.configuration=JSON.parse(this.configuration);
      if(this.configuration['Processor']==''){
        const url = `http://localhost:5083/api/products?categoryName=${this.catId}`;
        this.getData(url).subscribe(response => {
          this.response = response;
          console.log(this.response);

        }, error => {
          console.error('Greška u zahtevima', error);
        });
      }
      else {
        const url = `http://localhost:5083/api/products?ModelVersionId=${this.configuration['Processor']}`;
        this.getData(url).subscribe(response => {
          this.product = response;
          console.log(this.product);
          for (var spec of this.product[0].specifications) {
            if (spec.parentName == "Socket") {
              const url1 = `http://localhost:5083/api/products?SpecificationIds=${spec.id}&categoryName=${this.catId}`;
              this.getData(url1).subscribe(response => {
                this.response = response;
                console.log(this.SearchSpec);
              }, error => {
                console.error('Greška u zahtevima', error);
              });

            }
          }

    })
      }
    }
    else if(this.catId=="Case"){
      this.configuration=localStorage.getItem('configuration');
      this.configuration=JSON.parse(this.configuration);
      if(this.configuration['Motherboard']==''){
        const url = `http://localhost:5083/api/products?categoryName=${this.catId}`;
        this.getData(url).subscribe(response => {
          this.response = response;
          console.log(this.response);

        }, error => {
          console.error('Greška u zahtevima', error);
        });
      }
      else {
        const url = `http://localhost:5083/api/products?ModelVersionId=${this.configuration['Motherboard']}`;
        this.getData(url).subscribe(response => {
          this.product = response;
          console.log(this.product);
          for (var spec of this.product[0].specifications) {
            if (spec.parentName == "Format") {
              const url1 = `http://localhost:5083/api/products?SpecificationIds=${spec.id}&categoryName=${this.catId}`;
              this.getData(url1).subscribe(response => {
                this.response = response;
                console.log(this.SearchSpec);
              }, error => {
                console.error('Greška u zahtevima', error);
              });

            }
          }
        })
      }
    }

    else {
      const url = `http://localhost:5083/api/products?categoryName=${this.catId}`;
      this.getData(url).subscribe(response => {
        this.response = response;
        console.log(this.response);

      }, error => {
        console.error('Greška u zahtevima', error);
      });
    }





  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
  DodajUConfiguration(id: any, name: any){
    let configuration = JSON.parse(localStorage.getItem('configuration') || '{}');
    configuration[name] = id;
    localStorage.setItem('configuration', JSON.stringify(configuration));
    this.router.navigate(['/builder']);
  }


}
