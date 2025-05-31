import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlpNotFoundComponent } from './olp-not-found.component';

describe('OlpNotFoundComponent', () => {
  let component: OlpNotFoundComponent;
  let fixture: ComponentFixture<OlpNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OlpNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlpNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
