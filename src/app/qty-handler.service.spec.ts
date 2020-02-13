import { TestBed } from '@angular/core/testing';

import { QtyHandlerService } from './qty-handler.service';

describe('QtyHandlerService', () => {
  let service: QtyHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QtyHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
