import { Component, Input } from '@angular/core';

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


  isModalOpen = false;
  modalType: 'Insert' | 'Update' | null = null;
  selectedRow: any = null;

  openModal(type: 'Insert' | 'Update', row?: any): void {
    console.log(row);
    this.modalType = type;
    this.selectedRow = row || null;
    this.isModalOpen = true;
    console.log(this.selectedRow);
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.modalType = null;
    this.selectedRow = null;
  }
}
