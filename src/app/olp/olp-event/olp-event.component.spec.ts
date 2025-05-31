import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlpEventComponent } from './olp-event.component';

describe('OlpEventComponent', () => {
  let component: OlpEventComponent;
  let fixture: ComponentFixture<OlpEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OlpEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlpEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
