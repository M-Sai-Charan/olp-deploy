import { Component, ViewEncapsulation, OnInit, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { OlpService } from '../olp-services/olp.service';

interface OLPEvents {
  value: string;
  viewValue: string;
}

interface olpTimes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-olp-form',
  standalone: false,
  templateUrl: './olp-form.component.html',
  styleUrl: './olp-form.component.css',
  encapsulation: ViewEncapsulation.None
})
export class OlpFormComponent implements OnInit {
  contactForm: FormGroup;
  isMobile: boolean = true;

  olpEvents: OLPEvents[] = [
    { value: 'w', viewValue: 'Wedding' },
    { value: 'r', viewValue: 'Reception' },
    { value: 'h', viewValue: 'Haldi' },
  ];
  olpTimes: olpTimes[] = [
    { value: 'w', viewValue: 'Early Morning' },
    { value: 'r', viewValue: 'Morning' },
    { value: 'h', viewValue: 'Afernoon' },
  ];
  constructor(private olpService: OlpService, private fb: FormBuilder, private router: Router, private platform: Platform) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: ['', [Validators.required]],
      preShoot: this.fb.group({
    yes: [false],
    no: [false]
  }),
      events: this.fb.array([])
    });
    this.checkScreenSize();
  }

  ngOnInit(): void {
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = this.platform.ANDROID || this.platform.IOS || window.innerWidth < 768;
  }
  get events() {
    return this.contactForm.get('events') as FormArray;
  }

  addEvent() {
    const eventForm = this.fb.group({
      eventName: ['', Validators.required],
      eventTime: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventGuests: ['', Validators.required],
      eventDate: ['', Validators.required]
    });
    this.events.push(eventForm);
  }

  removeEvent(index: number) {
    this.events.removeAt(index);
  }

  onSubmit() {
    // if (this.contactForm.valid) {
      // this.olpService.postOLP('https://jsonplaceholder.typicode.com/posts', this.contactForm.value).subscribe((data: any) => {
      //   console.log(data)
      // })
      // console.log(this.convertJson(this.contactForm.value));
      // setTimeout(() => {
        this.router.navigateByUrl('/event')
      // }, 2000);
    // }
  }
  formatToYYYYMMDD(isoDate: any) {
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  convertJson(data: any) {
    return {
      "Bride": data.firstName,
      "Groom": data.lastName,
      "Email": data.email,
      "ContactNumber": data.phone,
      "comments": data.message,
      "Pre_Wedding": Number(data.preShoot),
      "events": data.events.map((event: any) => ({
        "EventName": event.eventName,
        "Time": event.eventTime,
        "Location": event.eventLocation,
        "No_Of_Guests": Number(event.eventGuests),
        "Date": this.formatToYYYYMMDD(event.eventDate)
      }))
    };
  }
}
