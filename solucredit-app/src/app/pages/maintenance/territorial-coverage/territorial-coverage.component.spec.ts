import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritorialCoverageComponent } from './territorial-coverage.component';

describe('TerritorialCoverageComponent', () => {
  let component: TerritorialCoverageComponent;
  let fixture: ComponentFixture<TerritorialCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerritorialCoverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritorialCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
