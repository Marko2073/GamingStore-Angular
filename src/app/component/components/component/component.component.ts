import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";



@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrl: './component.component.css'
})
export class ComponentComponent implements OnInit{
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
    else if (this.catId == "Motherboard") {
      this.configuration = localStorage.getItem('configuration');
      this.configuration = JSON.parse(this.configuration);

      if (this.configuration['Processor'] == '' && this.configuration['Case'] == '' && this.configuration['Graphics Card'] == '') {
        const url = `http://localhost:5083/api/products?categoryName=${this.catId}`;
        this.getData(url).subscribe(response => {
          this.response = response;
          console.log(this.response);
        }, error => {
          console.error('Greška u zahtevima', error);
        });
      } else {
        let socketId: number | null = null;
        let formatId: number | null = null;
        let pciExpressId: number | null = null;

        const processorPromise = this.configuration['Processor']
          ? this.getData(`http://localhost:5083/api/products?ModelVersionId=${this.configuration['Processor']}`).toPromise()
          : Promise.resolve(null);

        const casePromise = this.configuration['Case']
          ? this.getData(`http://localhost:5083/api/products?ModelVersionId=${this.configuration['Case']}`).toPromise()
          : Promise.resolve(null);

        const graphicsCardPromise = this.configuration['Graphics Card']
          ? this.getData(`http://localhost:5083/api/products?ModelVersionId=${this.configuration['Graphics Card']}`).toPromise()
          : Promise.resolve(null);

        Promise.all([processorPromise, casePromise, graphicsCardPromise]).then(([processorResponse, caseResponse, graphicsCardResponse]) => {
          // Pronađi Socket ID iz procesora
          if (processorResponse && processorResponse.length > 0) {
            for (let spec of processorResponse[0].specifications) {
              if (spec.parentName == "Socket") {
                socketId = spec.id;
                break;
              }
            }
          }

          // Pronađi Format ID iz kućišta
          if (caseResponse && caseResponse.length > 0) {
            for (let spec of caseResponse[0].specifications) {
              if (spec.parentName == "Format") {
                formatId = spec.id;
                break;
              }
            }
          }

          // Pronađi PCI Express ID iz grafičke kartice
          if (graphicsCardResponse && graphicsCardResponse.length > 0) {
            for (let spec of graphicsCardResponse[0].specifications) {
              if (spec.parentName == "PCI Express") {
                pciExpressId = spec.id;
                break;
              }
            }
          }

          // Formiraj API URL sa odgovarajućim filterima
          let filterQuery = `categoryName=${this.catId}`;
          if (socketId) filterQuery += `&SpecificationIds=${socketId}`;
          if (formatId) filterQuery += `&SpecificationIds=${formatId}`;
          if (pciExpressId) filterQuery += `&SpecificationIds=${pciExpressId}`;

          const urlMotherboard = `http://localhost:5083/api/products?${filterQuery}`;
          this.getData(urlMotherboard).subscribe(motherboardResponse => {
            this.response = motherboardResponse;
            console.log("Filtrirane matične ploče:", this.response);
          }, error => {
            console.error('Greška u zahtevima', error);
          });
        }).catch(error => {
          console.error('Greška u dohvatanju podataka', error);
        });
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


        const motherboardPromise = this.configuration['Motherboard']
          ? this.getData(`http://localhost:5083/api/products?ModelVersionId=${this.configuration['Motherboard']}`).toPromise()
          : Promise.resolve(null);

        const powerSupplyPromise = this.configuration['Power Supply']
          ? this.getData(`http://localhost:5083/api/products?ModelVersionId=${this.configuration['Power Supply']}`).toPromise()
          : Promise.resolve(null);

        Promise.all([motherboardPromise, powerSupplyPromise]).then(([mbResponse, psResponse]) => {
          console.log(mbResponse)

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
          console.log(pciExpressId)

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
    else if (this.catId == "Power Supply") {
      this.configuration = localStorage.getItem('configuration');
      this.configuration = JSON.parse(this.configuration);

      // Ako nema izabrane grafičke kartice, učitaj sva napajanja
      if (this.configuration['Graphics Card'] == '') {
        const url = `http://localhost:5083/api/products?categoryName=${this.catId}`;
        this.getData(url).subscribe(response => {
          this.response = response;
          console.log("Sva dostupna napajanja:", this.response);
        }, error => {
          console.error('Greška u zahtevima', error);
        });
      }
      else {
        let recommendedPower: number | null = null;

        // Dohvatanje podataka o izabranoj grafičkoj kartici
        const gpuPromise = this.getData(`http://localhost:5083/api/products?ModelVersionId=${this.configuration['Graphics Card']}`).toPromise();

        gpuPromise.then((gpuResponse) => {
          if (gpuResponse) {
            this.product = gpuResponse;
            console.log("Podaci o izabranoj grafičkoj kartici:", this.product);

            // Pronalaženje potrebne snage napajanja za GPU
            for (let spec of this.product[0].specifications) {
              if (spec.parentName === "Recommended power supply") {
                recommendedPower = parseInt(spec.name, 10);
                break;
              }
            }
          }

          // Dohvatanje svih napajanja
          const url1 = `http://localhost:5083/api/products?categoryName=${this.catId}`;
          this.getData(url1).subscribe(response => {
            this.temp = response;
            console.log("Sva napajanja pre filtriranja:", this.temp);

            // Filtriranje napajanja na osnovu potrebne snage grafičke kartice
            if (recommendedPower !== null) {
              this.temp = this.temp.filter((product: any) => {
                const powerSpec = product.specifications.find((spec: any) => spec.parentName === "Power");

                if (powerSpec && powerSpec.name) {
                  const powerValue = parseInt(powerSpec.name, 10);
                  return !isNaN(powerValue) && powerValue >= (recommendedPower ?? 0);
                }
                return true;
              });
            }

            this.response = [...this.temp];
            console.log("Filtrirana napajanja:", this.response);
          }, error => {
            console.error('Greška u zahtevima', error);
          });

        }).catch(error => {
          console.error('Greška u dohvatanju podataka o grafičkoj kartici', error);
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
