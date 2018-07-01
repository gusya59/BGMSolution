import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongEPComponent } from './wrong-e-p.component';

describe('WrongEPComponent', () => {
  let component: WrongEPComponent;
  let fixture: ComponentFixture<WrongEPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongEPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongEPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
