import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPageBrowserComponent } from './ng-page-browser.component';

describe('NgPageBrowserComponent', () => {
  let component: NgPageBrowserComponent;
  let fixture: ComponentFixture<NgPageBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgPageBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPageBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
