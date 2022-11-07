import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndeudamientoBancarioIndividualComponent } from './endeudamiento-bancario-individual.component';

describe('EndeudamientoBancarioIndividualComponent', () => {
  let component: EndeudamientoBancarioIndividualComponent;
  let fixture: ComponentFixture<EndeudamientoBancarioIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndeudamientoBancarioIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndeudamientoBancarioIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
