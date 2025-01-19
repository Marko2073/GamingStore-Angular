import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  formData: any = {};
  isModalOpen = false;
  modalType: 'Insert' | 'Update' | null = null;
  selectedRow: any = null;


  openModal(type: 'Insert' | 'Update', row?: any): void {
    this.modalType = type;
    this.selectedRow = row || null;
    this.isModalOpen = true;
    console.log(this.selectedRow);
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
}
