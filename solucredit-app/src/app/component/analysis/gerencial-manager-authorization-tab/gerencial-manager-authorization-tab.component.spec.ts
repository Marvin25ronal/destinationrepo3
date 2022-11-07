import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerencialManagerAuthorizationTabComponent } from './gerencial-manager-authorization-tab.component';

describe('GerencialManagerAuthorizationTabComponent', () => {
  let component: GerencialManagerAuthorizationTabComponent;
  let fixture: ComponentFixture<GerencialManagerAuthorizationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerencialManagerAuthorizationTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerencialManagerAuthorizationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
