import { Component, ViewEncapsulation, OnInit, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OlpService } from '../olp-services/olp.service';

interface OLPEvents {
  value: string;
  viewValue: string;
}

interface olpTimes {
  value: string;
  viewValue: string;
}
// json-server --watch olp.json --port 3000
// https://6842ebd8e1347494c31e748c.mockapi.io/olp/users
// https://2d81-2409-40f0-2033-7669-5824-9d94-56c4-96a6.ngrok-free.app/api/WeddingEvents
@Component({
  selector: 'app-olp-form',
  standalone: false,
  templateUrl: './olp-form.component.html',
  styleUrl: './olp-form.component.css',
  encapsulation: ViewEncapsulation.None
})
export class OlpFormComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
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
  olpEventsLists = [
    { id: 1, name: 'Haldi', value: 'haldi' },
    { id: 2, name: 'Nalugu', value: 'nalugu' },
    { id: 3, name: 'Mehandi', value: 'mehandi' },
    { id: 4, name: 'Sangeeth', value: 'sangeeth' },
    { id: 5, name: 'Reception', value: 'reception' },
    { id: 6, name: 'Marriage', value: 'marraige' },
  ]
  constructor(private olpService: OlpService, private fb: FormBuilder, private router: Router) {
    const preShootGroup: { [key: string]: FormControl } = {};
    this.olpEventsLists.forEach(event => {
      preShootGroup[event.value.toLowerCase()] = new FormControl(false);
    });
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      location: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: ['', [Validators.required]],
      preShoot: this.fb.group(preShootGroup),
      source: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
  onSubmit() {
    if (this.contactForm.valid) {
      this.olpService.postOLP('http://localhost:5246/api/WeddingEvents', this.convertJson(this.contactForm.value)).subscribe((data: any) => {
        if (data) {
          setTimeout(() => {
            const audio = new Audio('assets/sounds/click.wav');
            audio.play();
            this.submitted = true;
          }, 300);
        }
      })
    }
  }
  formatToYYYYMMDD(isoDate: any) {
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  convertJson(data: any) {
    const preWeddingSelected = this.olpEventsLists
      .filter(event => data.preShoot[event.value.toLowerCase()])
      .map(event => ({
        ...event,
      }));
    return {
      "Bride": data.firstName,
      "Groom": data.lastName,
      "Email": data.email,
      "ContactNumber": data.phone,
      "comments": data.message,
      "Pre_Wedding": preWeddingSelected,
      "location": data.location,
      "source": data.source,
      "timestamp": new Date().toISOString(),
    };
  }
}
