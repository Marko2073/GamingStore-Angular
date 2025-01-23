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

  @Output() parentChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  formData: any = {};
  isModalOpen = false;
  modalType: 'Insert' | 'Update' | null = null;
  selectedRow: any = null;
  errors: any = {};
  deleteError: string | null = null;


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
    this.postData(`http://localhost:5083/api/${this.tableName?.toLowerCase()}`, this.formData).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.getData(`http://localhost:5083/api/${this.tableName?.toLowerCase()}`).subscribe((response) => {
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

  Update(): void {
    this.putData(`http://localhost:5083/api/${this.tableName?.toLowerCase()}/${this.selectedRow.id}`, this.selectedRow).subscribe({
      next: (response) => {
        console.log('Update Success:', response);
        // Refresh the table data after successful update
        this.getData(`http://localhost:5083/api/${this.tableName?.toLowerCase()}`).subscribe((response) => {
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

  DeleteRow(row: number): void {
    this.http.delete(`http://localhost:5083/api/${this.tableName?.toLowerCase()}/${row}`).subscribe({
      next: (response) => {
        console.log('Delete Success:', response);
        // Refresh the table data after successful deletion
        this.getData(`http://localhost:5083/api/${this.tableName?.toLowerCase()}`).subscribe((response) => {
          this.response = response;
          console.log('Updated Data:', this.response);
        });
      },
      error: (err) => {
        // Set the error message and open the delete error modal
        this.deleteError = err.error ? err.error.error : 'An error occurred during deletion.';
        console.error('Delete Error:', this.deleteError);
      }
    });
  }

  closeDeleteErrorModal(): void {
    this.deleteError = null; // Close the delete error modal
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
}
