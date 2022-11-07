import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpeIndividualComponent } from './cpe-individual.component';

describe('CpeIndividualComponent', () => {
  let component: CpeIndividualComponent;
  let fixture: ComponentFixture<CpeIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpeIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpeIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
