import { TestBed } from '@angular/core/testing';

import { OlpService } from './olp.service';

describe('OlpService', () => {
  let service: OlpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
