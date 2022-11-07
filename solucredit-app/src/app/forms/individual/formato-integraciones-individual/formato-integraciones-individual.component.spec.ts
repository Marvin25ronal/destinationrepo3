import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoIntegracionesIndividualComponent } from './formato-integraciones-individual.component';

describe('FormatoIntegracionesIndividualComponent', () => {
  let component: FormatoIntegracionesIndividualComponent;
  let fixture: ComponentFixture<FormatoIntegracionesIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatoIntegracionesIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatoIntegracionesIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
