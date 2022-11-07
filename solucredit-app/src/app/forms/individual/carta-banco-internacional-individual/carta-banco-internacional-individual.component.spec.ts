import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaBancoInternacionalIndividualComponent } from './carta-banco-internacional-individual.component';

describe('CartaBancoInternacionalIndividualComponent', () => {
  let component: CartaBancoInternacionalIndividualComponent;
  let fixture: ComponentFixture<CartaBancoInternacionalIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaBancoInternacionalIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaBancoInternacionalIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
