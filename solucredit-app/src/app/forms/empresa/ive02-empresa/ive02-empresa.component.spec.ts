import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ive02EmpresaComponent } from './ive02-empresa.component';

describe('Ive02EmpresaComponent', () => {
  let component: Ive02EmpresaComponent;
  let fixture: ComponentFixture<Ive02EmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ive02EmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ive02EmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
