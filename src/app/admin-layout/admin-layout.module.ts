import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { HeaderComponent } from './components/admin-layout/components/header/header.component';
import { FooterComponent } from './components/admin-layout/components/footer/footer.component';
import { SidebarComponent } from './components/admin-layout/components/sidebar/sidebar.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    AdminLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AdminLayoutModule { }
