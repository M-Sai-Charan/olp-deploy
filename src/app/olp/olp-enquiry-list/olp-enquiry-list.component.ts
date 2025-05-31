import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OlpService } from '../olp-services/olp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olp-enquiry-list',
  standalone: false,
  templateUrl: './olp-enquiry-list.component.html',
  styleUrl: './olp-enquiry-list.component.css',
    encapsulation:ViewEncapsulation.None
})
export class OlpEnquiryListComponent implements OnInit {

  olpLists : any;
   displayedColumns: string[] = ['sno', 'bride', 'groom', 'contact', 'email', 'status', 'comments', 'actions'];
 constructor(
    private olpService:OlpService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.olpData()
  }

  olpData(){
    //this.olpService.getOLP('http://192.168.0.111:8080/api/OLP/GetEnquiries').subscribe((data:any) => {
    this.olpService.getOLP('http://localhost:5000/api/OLP/GetEnquiries').subscribe((data:any) => {
     this.olpLists = data
    })
  }
  onLogout(){
    this.router.navigateByUrl('/login')
  }
}
