import { Component, ViewEncapsulation, OnInit, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OlpService } from '../olp-services/olp.service';
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
  olpEventsLists: any = []
  constructor(private olpService: OlpService, private fb: FormBuilder, private router: Router) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, this.brideGroomValidator]],
      lastName: [''],
      location: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: ['', [Validators.required]],
      preShoot: this.fb.group({}),
      source: ['', Validators.required]
    });
  }
  brideGroomValidator(control: FormControl) {
    const value = control.value || '';
    const parts = value.split('&').map((part: any) => part.trim());
    if (parts.length !== 2 || parts[0] === '' || parts[1] === '') {
      return { invalidFormat: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.getOLPMasterData();
  }
  get events() {
    return this.contactForm.get('events') as FormArray;
  }
  getOLPMasterData() {
    this.olpService.getOLP('http://192.168.0.111:8080/api/olp/getmasterdata')
      .subscribe((data: any) => {
        if (data && Array.isArray(data.EventMaster)) {
          this.olpEventsLists = data.EventMaster
            .filter((event: any) => !!event.EventName)
            .map((event: any) => ({
              EventName: event.EventName,
              EventID:event.EventID,
              value: event.EventName.toLowerCase().replace(/\s+/g, '_')
            }));

          // Build the FormGroup for preShoot
          const preShootGroup: { [key: string]: FormControl } = {};
          this.olpEventsLists.forEach((event: any) => {
            preShootGroup[event.value] = new FormControl(false);
          });

          this.contactForm.setControl('preShoot', this.fb.group(preShootGroup));
        }
      });
  }
  onSubmit() {
    console.log(this.convertJson(this.contactForm.value))
    // if (this.contactForm.valid) {
    //   this.olpService.postOLP('https://olp-deploy.azurewebsites.net/api/WeddingEvents', this.convertJson(this.contactForm.value)).subscribe((data: any) => {
    //     if (data) {
    //       setTimeout(() => {
    //         const audio = new Audio('assets/sounds/click.wav');
    //         audio.play();
    //         this.submitted = true;
    //       }, 300);
    //     }
    //   })
    // }
  }
  convertJson(data: any) {
    const names = data.firstName.split('&').map((n: string) => n.trim());
    const bride = names[0] || '';
    const groom = names[1] || '';
    const preWeddingSelected = this.olpEventsLists
      .filter((event: any) => data.preShoot[event.value.toLowerCase()])
      .map((event: any) => (
        {
          eventName: event,
          eventDate: '',
          eventLocation: '',
          eventTime: '',
          eventGuests: '',
        }
      ));
    return {
      "Bride": bride,
      "Groom": groom,
      "ContactNumber": data.phone,
      "Email": data.email,
      "location": data.location,
      "comments": data.message,
      "source": data.source,
      "events": preWeddingSelected,
    };
  }
}
