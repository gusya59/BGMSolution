import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiGalleryComponent } from './api-gallery.component';

describe('ApiGalleryComponent', () => {
  let component: ApiGalleryComponent;
  let fixture: ComponentFixture<ApiGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
