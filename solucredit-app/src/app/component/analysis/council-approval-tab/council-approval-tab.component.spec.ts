import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilApprovalTabComponent } from './council-approval-tab.component';

describe('CouncilApprovalTabComponent', () => {
  let component: CouncilApprovalTabComponent;
  let fixture: ComponentFixture<CouncilApprovalTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilApprovalTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilApprovalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
