import { TestBed, inject } from '@angular/core/testing';

import { NgPageNavigatorService } from './ng-page-navigator.service';

describe('NgPageNavigatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgPageNavigatorService]
    });
  });

  it('should be created', inject([NgPageNavigatorService], (service: NgPageNavigatorService) => {
    expect(service).toBeTruthy();
  }));
});
