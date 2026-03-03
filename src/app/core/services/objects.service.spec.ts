import { TestBed } from '@angular/core/testing';

import { Objects } from './objects.service';

describe('Objects', () => {
  let service: Objects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Objects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
