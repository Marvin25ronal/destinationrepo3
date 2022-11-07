import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoactaEmpresaComponent } from './puntoacta-empresa.component';

describe('PuntoactaEmpresaComponent', () => {
  let component: PuntoactaEmpresaComponent;
  let fixture: ComponentFixture<PuntoactaEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoactaEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoactaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
