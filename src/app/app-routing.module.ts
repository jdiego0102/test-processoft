import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotationComponent } from './modules/quotation/quotation.component';

const routes: Routes = [
  {
    path: '',
    component: QuotationComponent,
    // canActivate: [CheckLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
