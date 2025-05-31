import { Component, ViewEncapsulation } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-olp-login',
  standalone: false,
  templateUrl: './olp-login.component.html',
  styleUrl: './olp-login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class OlpLoginComponent {

  constructor(private router:Router) {}
  onLogin() {
    this.router.navigateByUrl('/enquiry-list')
  }
}
