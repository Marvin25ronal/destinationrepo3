import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeicEmpresaComponent } from './feic-empresa.component';

describe('FeicEmpresaComponent', () => {
  let component: FeicEmpresaComponent;
  let fixture: ComponentFixture<FeicEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeicEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeicEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
