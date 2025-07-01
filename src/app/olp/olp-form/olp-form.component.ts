import { Component, ViewEncapsulation, OnInit, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OlpService } from '../olp-services/olp.service';
import { TranslateService } from '@ngx-translate/core';
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
  confettiArray = Array(30);
  isLoadingEvents = true;
  skeletonArray = Array(3);
  olpEventsLists: any = [];
  selectedLang = 'en';
  langs = [
    { label: '🇬🇧 English', value: 'en' },
    { label: '🇮🇳 తెలుగు', value: 'te' },
  ];
  constructor(private olpService: OlpService, private fb: FormBuilder, private router: Router, public translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.selectedLang = 'en';
    this.translate.use(this.selectedLang);

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
  switchLang(lang: string) {
    this.translate.use(lang);
    this.selectedLang = lang;
  }
  get events() {
    return this.contactForm.get('events') as FormArray;
  }
  getOLPMasterData() {
    this.isLoadingEvents = true;

    this.olpService.getOLP('https://onelookphotography.azurewebsites.net/api/olp/getmasterdata')
      .subscribe((data: any) => {
        if (data && Array.isArray(data.EventMaster)) {
          this.olpEventsLists = data.EventMaster
            .filter((event: any) => !!event.EventName)
            .map((event: any) => ({
              EventName: event.EventName,
              EventID: event.EventID,
              value: event.EventName.toLowerCase().replace(/\s+/g, '_')
            }));

          const preShootGroup: { [key: string]: FormControl } = {};
          this.olpEventsLists.forEach((event: any) => {
            preShootGroup[event.value] = new FormControl(false);
          });

          this.contactForm.setControl('preShoot', this.fb.group(preShootGroup));
        }

        this.isLoadingEvents = false;
      }, error => {
        console.error(error);
        this.isLoadingEvents = false;
      });
  }
  onSubmit() {
    if (this.contactForm.valid) {
      const jsonObj = this.convertJson(this.contactForm.value);
      const jsonStr = encodeURIComponent(JSON.stringify(jsonObj));  // Safely encode the JSON

      const url = `https://onelookphotography.azurewebsites.net/api/OLP/SetEnquiryDetails?value=${jsonStr}`;

      this.olpService.postOLP(url, {}).subscribe((data: any) => {
        if (data) {
          setTimeout(() => {
            this.submitted = true;
          }, 300);
        }
      });
    }
  }


  convertJson(data: any) {
    const names = data.firstName.split('&').map((n: string) => n.trim());
    const bride = names[0] || '';
    const groom = names[1] || '';
    const preWeddingSelected = this.olpEventsLists
      .filter((event: any) => data.preShoot[event.value.toLowerCase()])
      .map((event: any) => (
        {
          EventName: event?.EventName,
          EventDate: '',
          EventLocation: '',
          EventTime: '',
          EventGuests: '',
        }
      ));
    return {
      "Bride": bride,
      "Groom": groom,
      "ContactNumber": data.phone,
      "Email": data.email,
      "Location": data.location,
      "Comments": data.message,
      "Source": data.source,
      "Events": preWeddingSelected,
    };
  }
  formatDateToYMD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  trackByEvent(index: number, item: any) {
    return item.EventID;
  }
}
