import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportfiltersComponent } from './reportfilters.component';

describe('ReportfiltersComponent', () => {
  let component: ReportfiltersComponent;
  let fixture: ComponentFixture<ReportfiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportfiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
