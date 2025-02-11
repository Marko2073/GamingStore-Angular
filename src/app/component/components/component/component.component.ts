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
  temp: any=[];


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
      if(this.configuration['Processor']=='' && this.configuration['Case']==''){
        const url = `http://localhost:5083/api/products?categoryName=${this.catId}`;
        this.getData(url).subscribe(response => {
          this.response = response;
          console.log(this.response);

        }, error => {
          console.error('Greška u zahtevima', error);
        });
      }
      else {
        if (this.configuration['Processor'] != '') {
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
        if(this.configuration['Case']!=''){
          const url = `http://localhost:5083/api/products?ModelVersionId=${this.configuration['Case']}`;
          this.getData(url).subscribe(response => {
            this.product = response;
            console.log(this.product);
            for(var spec of this.product[0].specifications){
              if(spec.parentName=="Format"){
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
        if (this.configuration['Processor'] != '' && this.configuration['Case'] != '') {
          const urlProcessor = `http://localhost:5083/api/products?ModelVersionId=${this.configuration['Processor']}`;
          const urlCase = `http://localhost:5083/api/products?ModelVersionId=${this.configuration['Case']}`;

          let socketId: any;
          let formatId: any;

          // Dohvati podatke o procesoru
          this.getData(urlProcessor).subscribe(processorResponse => {
            if (processorResponse && processorResponse.length > 0) {
              for (let spec of processorResponse[0].specifications) {
                if (spec.parentName == "Socket") {
                  socketId = spec.id;
                  break;
                }
              }
            }

            // Dohvati podatke o kućištu
            this.getData(urlCase).subscribe(caseResponse => {
              if (caseResponse && caseResponse.length > 0) {
                for (let spec of caseResponse[0].specifications) {
                  if (spec.parentName == "Format") {
                    formatId = spec.id;
                    break;
                  }
                }
              }

              // Kada imamo i socketId i formatId, pokrećemo filtriranje matičnih ploča
              if (socketId && formatId) {
                const urlMotherboard = `http://localhost:5083/api/products?SpecificationIds=${socketId}&SpecificationIds=${formatId}&categoryName=${this.catId}`;
                this.getData(urlMotherboard).subscribe(motherboardResponse => {
                  this.response = motherboardResponse;
                  console.log(this.response);
                }, error => {
                  console.error('Greška u zahtevima', error);
                });
              }
            }, error => {
              console.error('Greška u zahtevima', error);
            });
          }, error => {
            console.error('Greška u zahtevima', error);
          });
        }
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
    else if (this.catId == "Graphics Card") {
      this.configuration = localStorage.getItem('configuration');
      this.configuration = JSON.parse(this.configuration);

      // Ako nema ni MotherBoard ni Power Supply, učitaj sve grafičke karte
      if (this.configuration['MotherBoard'] == '' && this.configuration['Power Supply'] == '') {
        const url = `http://localhost:5083/api/products?categoryName=${this.catId}`;
        this.getData(url).subscribe(response => {
          this.response = response;
          console.log(this.response);
        }, error => {
          console.error('Greška u zahtevima', error);
        });
      }
      else {
        let pciExpressId: number | null = null;
        let powerValue: number | null = null;

        const motherboardPromise = this.configuration['MotherBoard']
          ? this.getData(`http://localhost:5083/api/products?ModelVersionId=${this.configuration['MotherBoard']}`).toPromise()
          : Promise.resolve(null);

        const powerSupplyPromise = this.configuration['Power Supply']
          ? this.getData(`http://localhost:5083/api/products?ModelVersionId=${this.configuration['Power Supply']}`).toPromise()
          : Promise.resolve(null);

        Promise.all([motherboardPromise, powerSupplyPromise]).then(([mbResponse, psResponse]) => {

          // Ako postoji odgovor za matičnu ploču, nađi PCI Express specifikaciju
          if (mbResponse) {
            this.product = mbResponse;
            console.log("Podaci o matičnoj ploči:", this.product);

            for (let spec of this.product[0].specifications) {
              if (spec.parentName == "PCI Express") {
                pciExpressId = spec.id;
                break;
              }
            }
          }

          // Ako postoji odgovor za napajanje, nađi Power specifikaciju
          if (psResponse) {
            this.product = psResponse;
            console.log("Podaci o napajanju:", this.product);

            for (let spec of this.product[0].specifications) {
              if (spec.parentName === "Power") {
                powerValue = parseInt(spec.name, 10);
                break;
              }
            }
          }

          // Sada dohvatamo grafičke karte na osnovu PCI Express i Power Supply filtera
          let filterQuery = `categoryName=${this.catId}`;
          if (pciExpressId) filterQuery += `&SpecificationIds=${pciExpressId}`;

          const url1 = `http://localhost:5083/api/products?${filterQuery}`;
          this.getData(url1).subscribe(response => {
            this.temp = response;
            console.log("Sve grafičke pre filtriranja", this.temp);

            // Filtriranje grafičkih kartica na osnovu Power Supply
            if (powerValue !== null) {
              this.temp = this.temp.filter((product: any) => {
                const powerSpec = product.specifications.find((spec: any) => spec.parentName === "Recommended power supply");

                if (powerSpec && powerSpec.name) {
                  const requiredPower = parseInt(powerSpec.name, 10);
                  return !isNaN(requiredPower) && requiredPower <= (powerValue ?? 0);
                }
                return true;
              });
            }

            this.response = [...this.temp];
            console.log("Filtrirane grafičke kartice", this.response);
          }, error => {
            console.error('Greška u zahtevima', error);
          });

        }).catch(error => {
          console.error('Greška u dohvatanju podataka', error);
        });
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
