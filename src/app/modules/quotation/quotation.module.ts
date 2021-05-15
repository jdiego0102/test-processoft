import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationComponent } from './quotation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../../mat/mat.module';


@NgModule({
  declarations: [
    QuotationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule
  ]
})
export class QuotationModule { }
