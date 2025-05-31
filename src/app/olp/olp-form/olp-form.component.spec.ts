import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlpFormComponent } from './olp-form.component';

describe('OlpFormComponent', () => {
  let component: OlpFormComponent;
  let fixture: ComponentFixture<OlpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OlpFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
