import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OlpFormComponent } from './olp/olp-form/olp-form.component';
import { OlpEventComponent } from './olp/olp-event/olp-event.component';
import { OlpListComponent } from './olp/olp-list/olp-list.component';
import { OlpNotFoundComponent } from './olp/olp-not-found/olp-not-found.component';
import { OlpEnquiryListComponent } from './olp/olp-enquiry-list/olp-enquiry-list.component';
import { OlpLoginComponent } from './olp/olp-login/olp-login.component';

const routes: Routes = [
  { path: 'form', component: OlpFormComponent },
  { path: 'event', component: OlpEventComponent },
  { path: 'enquiry-form', component: OlpListComponent },
  { path: 'not-found', component: OlpNotFoundComponent },
  { path: 'enquiry-list', component: OlpEnquiryListComponent },
  { path: 'login', component: OlpLoginComponent },
  { path: '', redirectTo: '/enquiry-form', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
