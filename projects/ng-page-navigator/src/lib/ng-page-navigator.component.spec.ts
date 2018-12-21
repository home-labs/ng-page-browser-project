import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPageNavigatorComponent } from './ng-page-navigator.component';

describe('NgPageNavigatorComponent', () => {
  let component: NgPageNavigatorComponent;
  let fixture: ComponentFixture<NgPageNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgPageNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPageNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
