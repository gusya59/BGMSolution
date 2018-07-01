import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongDataComponent } from './wrong-data.component';

describe('WrongDataComponent', () => {
  let component: WrongDataComponent;
  let fixture: ComponentFixture<WrongDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
