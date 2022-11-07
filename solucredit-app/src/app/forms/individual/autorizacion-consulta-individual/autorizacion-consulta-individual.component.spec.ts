import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionConsultaIndividualComponent } from './autorizacion-consulta-individual.component';

describe('AutorizacionConsultaIndividualComponent', () => {
  let component: AutorizacionConsultaIndividualComponent;
  let fixture: ComponentFixture<AutorizacionConsultaIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacionConsultaIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionConsultaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
