import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilApprovalComponent } from './council-approval.component';

describe('CouncilApprovalComponent', () => {
  let component: CouncilApprovalComponent;
  let fixture: ComponentFixture<CouncilApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
