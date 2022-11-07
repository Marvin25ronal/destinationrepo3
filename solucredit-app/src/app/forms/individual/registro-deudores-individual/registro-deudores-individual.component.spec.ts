import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeudoresIndividualComponent } from './registro-deudores-individual.component';

describe('RegistroDeudoresIndividualComponent', () => {
  let component: RegistroDeudoresIndividualComponent;
  let fixture: ComponentFixture<RegistroDeudoresIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroDeudoresIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDeudoresIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
