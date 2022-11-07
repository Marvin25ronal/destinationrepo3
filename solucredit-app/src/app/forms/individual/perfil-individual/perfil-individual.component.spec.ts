import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilIndividualComponent } from './perfil-individual.component';

describe('PerfilIndividualComponent', () => {
  let component: PerfilIndividualComponent;
  let fixture: ComponentFixture<PerfilIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
