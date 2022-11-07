import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilmembersComponent } from './councilmembers.component';

describe('CouncilmembersComponent', () => {
  let component: CouncilmembersComponent;
  let fixture: ComponentFixture<CouncilmembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilmembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
