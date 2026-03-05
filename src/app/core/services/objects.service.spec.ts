import { TestBed } from '@angular/core/testing';

import { ObjectsService } from './objects.service';

describe('Objects', () => {
  let service: ObjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
