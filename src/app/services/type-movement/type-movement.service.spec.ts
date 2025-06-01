import { TestBed } from '@angular/core/testing';

import { TypeMovementService } from './type-movement.service';

describe('TypeMovementService', () => {
  let service: TypeMovementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
