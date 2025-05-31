import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlpEnquiryListComponent } from './olp-enquiry-list.component';

describe('OlpEnquiryListComponent', () => {
  let component: OlpEnquiryListComponent;
  let fixture: ComponentFixture<OlpEnquiryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OlpEnquiryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlpEnquiryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
