import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PepIndividualComponent } from './pep-individual.component';

describe('PepIndividualComponent', () => {
  let component: PepIndividualComponent;
  let fixture: ComponentFixture<PepIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PepIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PepIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
