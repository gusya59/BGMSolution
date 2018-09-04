import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestionsComponent } from './questions.component';

describe('QuestionsComponent', () => {
  let component: AdminQuestionsComponent;
  let fixture: ComponentFixture<AdminQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
