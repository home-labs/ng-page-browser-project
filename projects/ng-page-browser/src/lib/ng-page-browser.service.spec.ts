import { TestBed } from '@angular/core/testing';

import { NgPageBrowserService } from './ng-page-browser.service';

describe('NgPageBrowserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgPageBrowserService = TestBed.get(NgPageBrowserService);
    expect(service).toBeTruthy();
  });
});
