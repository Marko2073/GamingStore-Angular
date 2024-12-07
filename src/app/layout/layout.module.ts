import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/components/header/header.component';
import { FooterComponent } from './components/layout/components/footer/footer.component';
import {RouterModule, RouterOutlet} from "@angular/router";



@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class LayoutModule { }
