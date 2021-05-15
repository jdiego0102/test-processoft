import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from '../mat/mat.module';
import { DialogMsgComponent } from './components/dialog-msg/dialog-msg.component';



@NgModule({
  declarations: [
    DialogMsgComponent
  ],
  imports: [
    CommonModule,
    MatModule
  ],
  exports: []
})
export class SharedModule { }
