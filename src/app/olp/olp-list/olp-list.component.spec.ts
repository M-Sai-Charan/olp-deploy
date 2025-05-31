import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlpListComponent } from './olp-list.component';

describe('OlpListComponent', () => {
  let component: OlpListComponent;
  let fixture: ComponentFixture<OlpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OlpListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
