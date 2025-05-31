import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OlpFormComponent } from './olp/olp-form/olp-form.component';
import { OlpListComponent } from './olp/olp-list/olp-list.component';

const routes: Routes = [
  { path: 'form', component: OlpFormComponent },
  { path: 'enquiry-form', component: OlpListComponent },
  { path: '', redirectTo: '/enquiry-form', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
