import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css'],
})
export class AdminTableComponent {
  @Input() tableName: string | null = null;
  @Input() response: any[] = [];
  @Input() keys: string[] = [];
  @Input() InsertKeys: string[] = [];
  @Input() UpdateKeys: string[] = [];
  @Input() data: any = {};
  @Input() url: string = '';

  @Output() parentChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) { }


  formData: any = {};
  isModalOpen = false;
  modalType: 'Insert' | 'Update' | null = null;
  selectedRow: any = null;
  errors: any = {};
  deleteError: string | null = null;
  selectedFile: File | null = null;

  token = localStorage.getItem('token');
  headers = {
    'Authorization': `Bearer ${this.token}`
  }




  openModal(type: 'Insert' | 'Update', row?: any): void {
    this.modalType = type;
    this.selectedRow = row || null;
    this.isModalOpen = true;
    if(type == 'Update') {
      this.parentChanged.emit(this.selectedRow.parentId);
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.modalType = null;
    this.selectedRow = null;
  }

  onParentChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.parentChanged.emit(value);
  }

  SaveChanges(): void {
    if(this.modalType === 'Insert') {
      this.Insert();
      this.formData = {};
    } else if(this.modalType === 'Update') {
      this.Update();
    }



  }

  Insert(): void {

    console.log(this.formData);

    if(this.tableName=='Pictures'){
      const formData1 = new FormData();
      if(this.selectedFile)
      formData1.append('PicturePath', this.selectedFile);
      formData1.append('ModelVersionId', this.formData['modelVersionId'] )
      this.postData(`http://localhost:5083/api/${this.url?.toLowerCase()}`, formData1).subscribe({
        next: (response) => {

          this.getData(`http://localhost:5083/api/${this.url?.toLowerCase()}`).subscribe((response) => {
            this.response = response;
          });
        },
        error: (err) => {
          this.errors = err.error;
          console.error(this.errors.property+":", this.errors.error);
        },
        complete: () => {
          this.closeModal();
          this.errors = {};
        },
      });
    }
    else{
      this.postData(`http://localhost:5083/api/${this.url?.toLowerCase()}`, this.formData).subscribe({
        next: (response) => {

          this.getData(`http://localhost:5083/api/${this.url?.toLowerCase()}`).subscribe((response) => {
            this.response = response;
          });
        },
        error: (err) => {
          this.errors = err.error;
          console.error(this.errors.property+":", this.errors.error);
        },
        complete: () => {
          this.closeModal();
          this.errors = {};
        },
      });
    }




  }

  Update(): void {
    console.log(this.selectedRow);
    if(this.tableName=='Pictures'){
      const formData1 = new FormData();
      if(this.selectedFile)
        formData1.append('PicturePath', this.selectedFile);
      formData1.append('ModelVersionId', this.selectedRow['modelVersionId'] )
      this.putData(`http://localhost:5083/api/${this.url?.toLowerCase()}/${this.selectedRow.id}`, formData1).subscribe({
        next: (response) => {
          console.log('Update Success:', response);
          // Refresh the table data after successful update
          this.getData(`http://localhost:5083/api/${this.url?.toLowerCase()}`).subscribe((response) => {
            this.response = response;
            console.log('Updated Data:', this.response);
          });
        },
        error: (err) => {
          // Store the errors for display
          this.errors = err.error;
          console.error('Update Error:', this.errors);
        },
        complete: () => {
          this.closeModal();
          this.errors = {};
        }
      });
    }
    else {
      this.putData(`http://localhost:5083/api/${this.url?.toLowerCase()}/${this.selectedRow.id}`, this.selectedRow).subscribe({
        next: (response) => {
          console.log('Update Success:', response);
          // Refresh the table data after successful update
          this.getData(`http://localhost:5083/api/${this.url?.toLowerCase()}`).subscribe((response) => {
            this.response = response;
            console.log('Updated Data:', this.response);
          });
        },
        error: (err) => {
          // Store the errors for display
          this.errors = err.error;
          console.error('Update Error:', this.errors);
        },
        complete: () => {
          this.closeModal();
          this.errors = {};
        }
      });
    }

  }

  DeleteRow(row: number): void {
    this.http.delete(`http://localhost:5083/api/${this.url?.toLowerCase()}/${row}`).subscribe({
      next: (response) => {
        this.getData(`http://localhost:5083/api/${this.url?.toLowerCase()}`).subscribe((response) => {
          this.response = response;
        });
      },
      error: (err) => {
        this.deleteError = err.error ? err.error.error : 'An error occurred during deletion.';

      }
    });
  }

  closeDeleteErrorModal(): void {
    this.deleteError = null;
  }
  postData(url: string, formData:any): Observable<any> {
    return this.http.post<any>(url, formData);
  }
  getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
  putData(url: string, formData:any): Observable<any> {
    return this.http.put<any>(url, formData);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }


}
